import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import api from "../../services/api";
import Sidebar from "../../Components/Layout/Sidebar";
import Navbar from "../../Components/Layout/Navbar";

import ProfileInfoCard from "../../Components/Profile/ProfileInfoCard";
import ChangePasswordCard from "../../Components/Profile/ChangePasswordCard";
import SetPasswordCard from "../../Components/Profile/SetPasswordCard";
import DangerZoneCard from "../../Components/Profile/DangerZoneCard";
import DeleteAccountModal from "../../Components/Profile/DeleteAccountModal";

import styles from "../../styles/dashboardStyles";

export default function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/login");

    };

    useEffect(() => {

        loadProfile();

    }, []);

    // ===========================
    // GET PROFILE
    // ===========================

    const loadProfile = async () => {

        try {

            const response = await api.get("/profile");

            setProfile(response.data);

        }
        catch (error) {

            console.log(error);

            toast.error("Unable to load profile.");

        }

    };

    // ===========================
    // UPDATE PROFILE
    // ===========================

    const handleSaveProfile = async (data) => {

        try {

            await api.put("/profile", data);

            toast.success("Profile updated successfully.");

            await loadProfile();

        }
        catch (error) {

            console.log(error);

            toast.error("Unable to update profile.");

        }

    };

    // ===========================
    // CHANGE PASSWORD
    // ===========================

    const handleChangePassword = async (data) => {

        if (data.newPassword !== data.confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            await api.put("/profile/change-password", {

                currentPassword: data.currentPassword,
                newPassword: data.newPassword

            });

            toast.success("Password updated successfully.");

        }
        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.[0]?.description ||

                "Unable to change password."

            );

        }

    };

    const handleSetPassword = async (data) => {

        if (data.newPassword !== data.confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            await api.put("/profile/set-password", {
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            });

            toast.success("Password set successfully.");

            await loadProfile();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to set password."
            );

        }

    };

    // ===========================
    // DELETE ACCOUNT
    // ===========================

    const handleDeleteAccount = async (password) => {

        try {

            await api.delete("/profile", {

                data: {

                    password: password || null

                }

            });

            toast.success("Account deleted successfully.");

            setShowDeleteModal(false);

            localStorage.removeItem("token");

            navigate("/login");

        }
        catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable to delete account."

            );

        }

    };

    if (!profile) {

        return (

            <div style={styles.page}>

                <Sidebar logout={logout} />

                <div style={styles.main}>

                    <Navbar />

                    <div style={styles.content}>

                        Loading...

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div style={styles.page}>

            <Sidebar logout={logout} />

            <div style={styles.main}>

                <Navbar />

                <div style={styles.content}>

                    <h1 style={styles.pageTitle}>
                        My Profile
                    </h1>

                    <p style={styles.pageSubtitle}>
                        Manage your account settings.
                    </p>

                    <ProfileInfoCard
                        profile={profile}
                        onSave={handleSaveProfile}
                    />

                    {
                        profile.hasPassword ? (

                            <ChangePasswordCard
                                onChangePassword={handleChangePassword}
                            />

                        ) : (

                            <SetPasswordCard
                                onSetPassword={handleSetPassword}
                            />

                        )
                    }

                    <DangerZoneCard
                        onDeleteClick={() => setShowDeleteModal(true)}
                    />

                    <DeleteAccountModal
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={handleDeleteAccount}
                        hasPassword={profile.hasPassword}
                    />

                </div>

            </div>

        </div>

    );

}