"use client";
import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              "account",
              "billing",
              "appearance",
              "notifications",
              "delete",
            ].map((tab) => {
              const tabName = tab.charAt(0).toUpperCase() + tab.slice(1);
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-[#3800b3] text-[#3800b3]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab === "billing"
                    ? "Billing & Plan"
                    : tab === "appearance"
                    ? "Appearance"
                    : tab === "delete"
                    ? "Delete Account"
                    : tabName}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {activeTab === "account" && <AccountTab />}
          {activeTab === "billing" && <BillingTab />}
          {activeTab === "appearance" && <AppearanceTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "delete" && <DeleteAccountTab />}
        </div>
      </div>
    </div>
  );
};

// Account Tab Component
const AccountTab = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [bio, setBio] = useState(
    "Product designer with a passion for creating beautiful interfaces."
  );
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Account Information
      </h2>

      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <button
            onClick={triggerFileInput}
            className="absolute -bottom-2 -right-2 bg-[#3800b3] text-white p-1.5 rounded-full hover:bg-[#2d0091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3800b3]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePicChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500">
            JPG, GIF or PNG. Max size of 5MB
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3800b3] focus:ring-[#3800b3] sm:text-sm p-2 border"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3800b3] focus:ring-[#3800b3] sm:text-sm p-2 border"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3800b3] focus:ring-[#3800b3] sm:text-sm p-2 border"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[#3800b3] text-white rounded-md hover:bg-[#2d0091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3800b3]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Billing Tab Component
const BillingTab = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900">Billing & Plan</h2>
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium text-gray-900">Current Plan</h3>
      <p className="text-gray-600 mt-1">Pro Plan - $19/month</p>
    </div>
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Payment Method</h3>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-md mr-3">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 14c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-sm text-gray-500">Expires 04/2025</p>
          </div>
        </div>
        <button className="text-sm font-medium text-[#3800b3] hover:text-[#2d0091]">
          Update
        </button>
      </div>
    </div>
    <div className="pt-4 border-t">
      <button className="px-4 py-2 bg-[#3800b3] text-white rounded-md hover:bg-[#2d0091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3800b3]">
        Upgrade Plan
      </button>
    </div>
  </div>
);

// Appearance Tab Component
const AppearanceTab = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Theme</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setTheme("light")}
            className={`p-4 border rounded-md flex-1 ${
              theme === "light"
                ? "border-[#3800b3] ring-2 ring-[#3800b3]"
                : "border-gray-300"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-full h-24 bg-white border border-gray-200 rounded mb-2"></div>
              <span className="text-sm font-medium">Light</span>
            </div>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-4 border rounded-md flex-1 ${
              theme === "dark"
                ? "border-[#3800b3] ring-2 ring-[#3800b3]"
                : "border-gray-300"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-full h-24 bg-gray-800 border border-gray-700 rounded mb-2"></div>
              <span className="text-sm font-medium">Dark</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Notifications Tab Component
const NotificationsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive updates via email</p>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              emailNotifications ? "bg-[#3800b3]" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                emailNotifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Push Notifications</h3>
            <p className="text-sm text-gray-500">
              Receive updates on your device
            </p>
          </div>
          <button
            onClick={() => setPushNotifications(!pushNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              pushNotifications ? "bg-[#3800b3]" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                pushNotifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Account Tab Component
const DeleteAccountTab = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900">Delete Account</h2>
    <div className="bg-red-50 p-4 rounded-md">
      <h3 className="font-medium text-red-800">Warning</h3>
      <p className="text-red-700 mt-1">
        Deleting your account will permanently remove all of your data. This
        action cannot be undone.
      </p>
    </div>
    <div>
      <label
        htmlFor="confirm"
        className="block text-sm font-medium text-gray-700"
      >
        Type "DELETE" to confirm
      </label>
      <input
        type="text"
        id="confirm"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3800b3] focus:ring-[#3800b3] sm:text-sm p-2 border"
        placeholder="DELETE"
      />
    </div>
    <div className="flex justify-end">
      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Delete Account
      </button>
    </div>
  </div>
);

export default SettingsPage;
