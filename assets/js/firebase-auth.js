// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa0cMRqPooAUpI9om-NBqYqWwgCpsUIAw",
  authDomain: "lexa-28162.firebaseapp.com",
  databaseURL: "https://lexa-28162-default-rtdb.firebaseio.com",
  projectId: "lexa-28162",
  storageBucket: "lexa-28162.appspot.com",
  messagingSenderId: "your-sender-id", // You'll need to add this
  appId: "your-app-id" // You'll need to add this
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// References to authentication and database
const auth = firebase.auth();
const database = firebase.database();

// Sign up function
function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`${errorCode}: ${errorMessage}`);
    });
}

// Sign in function
function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`${errorCode}: ${errorMessage}`);
    });
}

// Sign out function
function signOut() {
  return auth.signOut()
    .then(() => {
      // Sign-out successful
      return true;
    })
    .catch((error) => {
      throw new Error(`Sign out error: ${error.message}`);
    });
}

// Get current user
function getCurrentUser() {
  return auth.currentUser;
}

// Get user details from database
function getUserDetails(userId) {
  return database.ref('users/' + userId)
    .once('value')
    .then((snapshot) => {
      const userData = snapshot.val();
      if (!userData) {
        return null;
      }
      
      // Add debug logging
      console.log('Full user data structure:', userData);
      
      // Ensure classes property is accessible
      if (userData.classes) {
        console.log('Classes found in user data:', userData.classes);
      }
      
      return userData;
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
      throw new Error(`Error fetching user details: ${error.message}`);
    });
}

// Listen for auth state changes
function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}

// Get classes for a user
function getUserClasses(userId) {
  return database.ref('users/' + userId + '/classes')
    .once('value')
    .then((snapshot) => {
      const classes = snapshot.val();
      if (!classes) {
        return null;
      }
      console.log('Classes data from directly in user object:', classes);
      return classes;
    })
    .catch((error) => {
      console.error('Error fetching user classes:', error);
      throw new Error(`Error fetching user classes: ${error.message}`);
    });
}

// Get tasks for a specific class
function getClassTasks(userId, classId) {
  return database.ref('users/' + userId + '/classes/' + classId + '/tasks')
    .once('value')
    .then((snapshot) => {
      const tasks = snapshot.val();
      if (!tasks) {
        return null;
      }
      console.log('Tasks for class ' + classId + ':', tasks);
      return tasks;
    })
    .catch((error) => {
      console.error('Error fetching class tasks:', error);
      throw new Error(`Error fetching class tasks: ${error.message}`);
    });
} 