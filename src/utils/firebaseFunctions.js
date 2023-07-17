//import firebase from "firebase/app";
import "firebase/auth";
import { auth, reauthenticateWithCredential } from "./firebase";

export function reauthenticate(password) {
    const user = auth.currentUser
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );

    return reauthenticateWithCredential(user, credentials)
}