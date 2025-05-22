"use client";
import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("Settings");
  const tabs = [
    t("tabs.account"),
    t("tabs.billing"),
    t("tabs.appearance"),
    t("tabs.notifications"),
    t("tabs.delete"),
  ];
  const tabContent = [
    <AccountTab />,
    <BillingTab />,
    <AppearanceTab />,
    <NotificationsTab />,
    <DeleteAccountTab />,
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab, key) => {
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? "border-[#3800b3] text-[#3800b3]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

// Account Tab Component
const AccountTab = () => {
  const t = useTranslations("Settings");
  const [name, setName] = useState(t("account.fields.name.placeholder"));
  const [email, setEmail] = useState(t("account.fields.email.placeholder"));
  const [bio, setBio] = useState(t("account.profile.default_bio"));
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
        {t("account.title")}
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
            {t("account.profile.upload_help")}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {t("account.fields.name.label")}
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
            {t("account.fields.email.label")}
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
            {t("account.fields.bio.label")}
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
          {t("account.save_button")}
        </button>
      </div>
    </div>
  );
};

// Billing Tab Component
const BillingTab = () => {
  const t = useTranslations("Settings");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {t("billing.title")}
      </h2>
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-gray-900">
          {t("billing.current_plan.title")}
        </h3>
        <p className="text-gray-600 mt-1">
          {t("billing.current_plan.description")}
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">
          {t("billing.payment_method.title")}
        </h3>
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
              <p className="font-medium">{t("billing.payment_method.card")}</p>
              <p className="text-sm text-gray-500">
                {t("billing.payment_method.expires")}
              </p>
            </div>
          </div>
          <button className="text-sm font-medium text-[#3800b3] hover:text-[#2d0091]">
            {t("billing.payment_method.update_button")}
          </button>
        </div>
      </div>
      <div className="pt-4 border-t">
        <button className="px-4 py-2 bg-[#3800b3] text-white rounded-md hover:bg-[#2d0091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3800b3]">
          {t("billing.upgrade_button")}
        </button>
      </div>
    </div>
  );
};

// Appearance Tab Component
const AppearanceTab = () => {
  const t = useTranslations("Settings");
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {t("appearance.title")}
      </h2>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">
          {t("appearance.theme.title")}
        </h3>
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
              <span className="text-sm font-medium">
                {t("appearance.theme.light")}
              </span>
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
              <span className="text-sm font-medium">
                {t("appearance.theme.dark")}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Notifications Tab Component
const NotificationsTab = () => {
  const t = useTranslations("Settings");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {t("notifications.title")}
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">
              {t("notifications.email.title")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("notifications.email.description")}
            </p>
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
            <h3 className="font-medium text-gray-900">
              {t("notifications.push.title")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("notifications.push.description")}
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
const DeleteAccountTab = () => {
  const t = useTranslations("Settings");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {t("delete.title")}
      </h2>
      <div className="bg-red-50 p-4 rounded-md">
        <h3 className="font-medium text-red-800">
          {t("delete.warning.title")}
        </h3>
        <p className="text-red-700 mt-1">{t("delete.warning.description")}</p>
      </div>
      <div>
        <label
          htmlFor="confirm"
          className="block text-sm font-medium text-gray-700"
        >
          {t("delete.confirmation.label")}
        </label>
        <input
          type="text"
          id="confirm"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3800b3] focus:ring-[#3800b3] sm:text-sm p-2 border"
          placeholder={t("delete.confirmation.placeholder")}
        />
      </div>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          {t("delete.delete_button")}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
