// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {MainWindows} from "../libs/component_config/MainWindows";
import GraphWindow from "./graphs/GraphWindow";
import HomePage from "./Home/HomePage";
// import {FirebaseApp} from "@firebase/app";
// import {
//     getAuth,
//     getRedirectResult,
//     GoogleAuthProvider,
//     onAuthStateChanged,
//     signInWithRedirect,
//     UserCredential
// } from "firebase/auth";
// import {app, db} from "../firebase/firebase";
// import jwt from 'jsonwebtoken';
// import {addDoc, collection, doc, setDoc} from "firebase/firestore";
// import {storeExpensesServer, storeSettings, storeUser} from "../firebase/asyncTest";
// Import the functions you need from the SDKs you need


type Props = {
    // stateObj:any;
};
type State = {};

export function Main() {
    //
    // const [signedInUser, setSignedInUser] = useState(null);
    // const [userID, setUserID] = useState(null);

    //signup signin
    // async function signIn(app: FirebaseApp) {
    //
    //     console.log("HERE");
    //     const provider = new GoogleAuthProvider();
    //     provider.addScope("https://www.googleapis.com/auth/drive.appdata");
    //
    //     const auth = getAuth(app);
    //     await signInWithRedirect(auth, provider);
    //
    //     getRedirectResult(auth)
    //         .then((result: UserCredential | null) => {
    //             // This gives you a Google Access Token. You can use it to access Google APIs.
    //             const credential = GoogleAuthProvider.credentialFromResult(result as UserCredential);
    //             //@ts-ignore
    //             const token = credential.accessToken;
    //
    //
    //             // The signed-in user info.
    //             //@ts-ignore
    //             const user = result.user;
    //
    //
    //         }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //
    //         console.log(error);
    //     })
    // }
    //
    // useEffect(() => {
    //
    //     if (signedInUser) {
    //
    //         //@ts-ignore
    //         let tempUserID = jwt.decode(signedInUser.accessToken)?.user_id;
    //
    //         console.log(tempUserID);
    //
    //         if (tempUserID) {
    //             setUserID(tempUserID);
    //         }
    //
    //         //todo
    //         // sync
    //         // store locally
    //         // update user
    //         //todo leave this in for firestore impl
    //         //     // getDoc(collection(db, "users"));
    //         //     // let tempvar:UserImpl = signedInUser;
    //         let expenses = JSON.parse(localStorage.getItem("ak_expenses") as string);
    //         let settings = JSON.parse(localStorage.getItem("ak_settings") as string);
    //
    //
    //
    //         // storeUser(userID).then(()=>{
    //         //     storeExpensesServer(expenses, userID);
    //         //     storeSettings(settings, userID);
    //         // })
    //         // addDoc(collection(db, "users"), {
    //         //     //@ts-ignore
    //         //     id: userID,
    //         //     dateJoined: new Date(),
    //         //
    //         // }).then((docRef: any) => {
    //         //     docRef.collection(
    //         //         collection(db, "expenses"), {
    //         //             ...[expenses]
    //         //         }).then((docRef:any) =>{
    //         //             console.log("DONE");
    //         //     }).catch((e:any)=>{console.log(e)})
    //         //     console.log("Document written with ID: ", docRef.id);
    //         // }).catch((error: any) => {
    //         //     console.error("Error adding document: ", error);
    //         // });
    //         //
    //
    //     }
    // }, [signedInUser]);
    //
    //
    // const auth = getAuth(app);
    // onAuthStateChanged(auth, (user: any) => {
    //         if (user) {
    //             return setSignedInUser(user);
    //         }
    //         return setSignedInUser(null);
    //     }
    // )


    const [currentWindow, setCurrentWindow] = useState(MainWindows.home);


    function switchWindow(window: MainWindows) {
        setCurrentWindow(window);
    }

    // function signOut(app: FirebaseApp) {
    //     const auth = getAuth(app);
    //     auth.signOut().then((val: any) => {
    //         console.log(val)
    //     }).catch((err:any) => console.log("ERROR LOGGING OUT: ", err))
    // }


    return (
        <div className={"h-[100vh] overflow-y-scroll p-0"}
        >

            {currentWindow === MainWindows.graphs &&
                <GraphWindow switchWindow={switchWindow}/>

            }
            {currentWindow === MainWindows.home &&
                <HomePage switchWindow={switchWindow}/>
            }


        </div>


    )
}

export default Main;
