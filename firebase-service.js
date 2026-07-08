(function() {
  const COLLECTIONS = {
    submissions: 'healing_submissions',
    interviews: 'healing_interviews'
  };

  let firestore = null;
  let online = false;

  try {
    if (window.firebase && window.HEALING_FIREBASE_CONFIG) {
      if (!firebase.apps.length) firebase.initializeApp(window.HEALING_FIREBASE_CONFIG);
      firestore = firebase.firestore();
      online = true;
    }
  } catch (error) {
    console.warn('Firebase initialization failed. Falling back to localStorage.', error);
  }

  function readLocal(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
      console.warn(`Failed to read ${key} from localStorage.`, error);
      return [];
    }
  }

  function writeLocal(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  function sortByDate(items, field) {
    return [...items].sort((a, b) => new Date(b[field] || 0) - new Date(a[field] || 0));
  }

  async function list(collectionKey, localKey, dateField) {
    if (!online) return sortByDate(readLocal(localKey), dateField);
    const snapshot = await firestore.collection(COLLECTIONS[collectionKey]).get();
    return sortByDate(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })), dateField);
  }

  async function save(collectionKey, localKey, item) {
    const id = String(item.id || Date.now());
    const payload = { ...item, id };
    if (online) {
      await firestore.collection(COLLECTIONS[collectionKey]).doc(id).set(payload, { merge: true });
    }
    const localItems = readLocal(localKey).filter(existing => String(existing.id) !== id);
    writeLocal(localKey, [payload, ...localItems]);
    return payload;
  }

  async function remove(collectionKey, localKey, id) {
    const docId = String(id);
    if (online) {
      await firestore.collection(COLLECTIONS[collectionKey]).doc(docId).delete();
    }
    writeLocal(localKey, readLocal(localKey).filter(item => String(item.id) !== docId));
  }

  async function clear(collectionKey, localKey) {
    if (online) {
      const snapshot = await firestore.collection(COLLECTIONS[collectionKey]).get();
      const batches = [];
      let batch = firestore.batch();
      let count = 0;

      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
        count += 1;
        if (count === 450) {
          batches.push(batch.commit());
          batch = firestore.batch();
          count = 0;
        }
      });

      if (count > 0) batches.push(batch.commit());
      await Promise.all(batches);
    }
    writeLocal(localKey, []);
  }

  async function seedSubmissions(items) {
    if (online) {
      const batch = firestore.batch();
      items.forEach(item => {
        const id = String(item.id || Date.now());
        batch.set(firestore.collection(COLLECTIONS.submissions).doc(id), { ...item, id, source: item.source || 'mock' }, { merge: true });
      });
      await batch.commit();
    }

    const existing = readLocal(COLLECTIONS.submissions);
    const ids = new Set(items.map(item => String(item.id)));
    writeLocal(COLLECTIONS.submissions, [
      ...items.map(item => ({ ...item, id: String(item.id), source: item.source || 'mock' })),
      ...existing.filter(item => !ids.has(String(item.id)))
    ]);
  }

  window.HealingDB = {
    isOnline: () => online,
    listSubmissions: () => list('submissions', COLLECTIONS.submissions, 'submittedAt'),
    addSubmission: item => save('submissions', COLLECTIONS.submissions, item),
    deleteSubmission: id => remove('submissions', COLLECTIONS.submissions, id),
    clearSubmissions: () => clear('submissions', COLLECTIONS.submissions),
    seedSubmissions,
    listInterviews: () => list('interviews', COLLECTIONS.interviews, 'ts'),
    addInterview: item => save('interviews', COLLECTIONS.interviews, item),
    deleteInterview: id => remove('interviews', COLLECTIONS.interviews, id),
    clearInterviews: () => clear('interviews', COLLECTIONS.interviews)
  };
})();
