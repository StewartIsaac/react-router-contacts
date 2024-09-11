import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";
import { useState, useEffect } from "react";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
    const { contact } = useLoaderData();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first: contact?.first || "",
        last: contact?.last || "",
        twitter: contact?.twitter || "",
        avatar: contact?.avatar || "",
        notes: contact?.notes || ""
    });

    useEffect(() => {
        setFormData({
            first: contact?.first || "",
            last: contact?.last || "",
            twitter: contact?.twitter || "",
            avatar: contact?.avatar || "",
            notes: contact?.notes || ""
        });
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    value={formData.first}
                    onChange={handleChange}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    value={formData.last}
                    onChange={handleChange}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    placeholder="@jack"
                    value={formData.twitter}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button"
                    onClick={() => {
                        navigate(-1);
                    }}>
                    Cancel
                </button>
            </p>
        </Form>
    );
}
