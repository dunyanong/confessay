import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Head from "next/head";

const Error = () => {
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    useEffect(() => {
        setTimeout(() => {
            return route.push("/");
        }, 3000)
    })
    return (
        <div>
            <Head>
            <title>Confessay</title> 
            </Head>
        <div className="text-center p-10 mt-10">  
            <h2 className="text-6xl text-center">404</h2>
            <p className="my-1">There is nothing here</p>
            <h3>Bringing you back to the homepage.....</h3>
        </div>
        </div>
    );
}
 
export default Error;
