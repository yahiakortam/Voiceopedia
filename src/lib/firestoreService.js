import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Collection references
const storiesCollectionRef = collection(db, 'stories');
const resourcesCollectionRef = collection(db, 'resources');
const organizationInfoCollectionRef = collection(db, 'organizationInfo');

// --- Stories CRUD Operations ---
export const getStories = async () => {
  const data = await getDocs(storiesCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const addStory = async (story) => {
  await addDoc(storiesCollectionRef, story);
};

export const updateStory = async (id, story) => {
  const storyDoc = doc(db, 'stories', id);
  await updateDoc(storyDoc, story);
};

export const deleteStory = async (id) => {
  const storyDoc = doc(db, 'stories', id);
  await deleteDoc(storyDoc);
};

// --- Resources CRUD Operations ---
export const getResources = async () => {
  const data = await getDocs(resourcesCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const addResource = async (resource) => {
  await addDoc(resourcesCollectionRef, resource);
};

export const updateResource = async (id, resource) => {
  const resourceDoc = doc(db, 'resources', id);
  await updateDoc(resourceDoc, resource);
};

export const deleteResource = async (id) => {
  const resourceDoc = doc(db, 'resources', id);
  await deleteDoc(resourceDoc);
};

// --- Organization Info CRUD Operations ---
export const getOrganizationInfo = async () => {
  const data = await getDocs(organizationInfoCollectionRef);
  // Assuming there's only one organization info document
  return data.docs.length > 0 ? { ...data.docs[0].data(), id: data.docs[0].id } : null;
};

export const updateOrganizationInfo = async (id, info) => {
  const infoDoc = doc(db, 'organizationInfo', id);
  await updateDoc(infoDoc, info);
};

export const addOrganizationInfo = async (info) => {
  await addDoc(organizationInfoCollectionRef, info);
};

