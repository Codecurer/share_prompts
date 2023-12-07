import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const user = await User.findById(params?.id).populate("");
        if (!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const { username } = await request.json();
    try {
        await connectToDB();

        // // Find the existing prompt by ID
        let existingUser = await User.findById(params.id);

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }

        existingUser.username = username;

        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};