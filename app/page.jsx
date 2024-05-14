import SigninForm from "./components/SigninForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

const Home = async () => {
    const session = await getServerSession(authOptions);

    if (session) redirect("/dashboard");

    return (
        <main>
            <SigninForm />
        </main>
    );
}

export default Home;