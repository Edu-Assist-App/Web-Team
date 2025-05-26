"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { readUserMe, updateUserMe, User, UserUpdate } from "../../../Services/api/user";

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
    <div className="px-4 py-8 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
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
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

// Account Tab Component
const AccountTab = () => {
  const t = useTranslations("Settings");
  const [userData, setUserData] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await readUserMe();
        setUserData(user);
        setName(user.full_name || "");
        setEmail(user.email || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Handle error (e.g., show a notification to the user)
      }
    };
    fetchUserData();
  }, []);

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

  const handleSaveChanges = async () => {
    if (!userData) return;

    if (newPassword && newPassword !== confirmNewPassword) {
      alert("New passwords do not match!"); // Replace with a better notification
      return;
    }

    const payload: UserUpdate = {};
    if (name !== (userData.full_name || "")) {
      payload.full_name = name;
    }
    if (email !== userData.email) {
      payload.email = email;
    }
    if (newPassword) {
      payload.password = newPassword;
    }

    if (Object.keys(payload).length === 0) {
      alert("No changes to save."); // Replace with a better notification
      return;
    }

    try {
      const updatedUser = await updateUserMe(payload);
      setUserData(updatedUser);
      setName(updatedUser.full_name || "");
      setEmail(updatedUser.email || "");
      setNewPassword("");
      setConfirmNewPassword("");
      alert("Changes saved successfully!"); // Replace with a better notification
    } catch (error) {
      console.error("Failed to update user data:", error);
      alert("Failed to save changes."); // Replace with a better notification
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {t("account.title")}
      </h2>

      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="overflow-hidden w-20 h-20 bg-gray-100 rounded-full">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full text-gray-400">
                <svg
                  className="w-10 h-10"
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
              className="w-4 h-4"
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

        {/* Password Change Section */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3800b3] focus:ring-[#3800b3] sm:text-sm p-2 border"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3800b3] focus:ring-[#3800b3] sm:text-sm p-2 border"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-6">
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-[#3800b3] text-white rounded-md hover:bg-[#2d0091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3800b3]"
        >
          {t("account.save_button")}
        </button>
      </div>
    </div>
  );
};

// Billing Tab Component
const BillingTab = () => {
  const t = useTranslations("Settings")
  const [billingMode, setBillingMode] = useState<"subscription" | "byok">("subscription")
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    google: "",
    xai: "",
    anthropic: "",
  })
  const [showApiKeys, setShowApiKeys] = useState({
    openai: false,
    google: false,
    xai: false,
    anthropic: false,
  })

  const handleApiKeyChange = (provider: string, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [provider]: value,
    }))
  }

  const toggleApiKeyVisibility = (provider: string) => {
    setShowApiKeys((prev) => ({
      ...prev,
      [provider]: !prev[provider as keyof typeof prev],
    }))
  }

  const saveApiKeys = () => {
    // Here you would implement the logic to securely save the API keys
    console.log("Saving API keys:", apiKeys)
    // You might want to encrypt these before sending to your backend
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">{t("billing.title")}</h2>

      {/* Billing Mode Selection */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Choose Your AI Access Method</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={() => setBillingMode("subscription")}
            className={`p-4 border rounded-lg text-left transition-all ${
              billingMode === "subscription"
                ? "border-[#3800b3] ring-2 ring-[#3800b3] bg-purple-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  billingMode === "subscription" ? "border-[#3800b3] bg-[#3800b3]" : "border-gray-300"
                }`}
              >
                {billingMode === "subscription" && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
              </div>
              <h4 className="font-medium text-gray-900">Subscription Plan</h4>
            </div>
            <p className="text-sm text-gray-600">Use our managed AI service with guaranteed uptime and support</p>
            <div className="mt-2 text-sm font-medium text-[#3800b3]">$19/month - All AI models included</div>
          </button>

          <button
            onClick={() => setBillingMode("byok")}
            className={`p-4 border rounded-lg text-left transition-all ${
              billingMode === "byok"
                ? "border-[#3800b3] ring-2 ring-[#3800b3] bg-purple-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  billingMode === "byok" ? "border-[#3800b3] bg-[#3800b3]" : "border-gray-300"
                }`}
              >
                {billingMode === "byok" && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
              </div>
              <h4 className="font-medium text-gray-900">Bring Your Own Keys</h4>
            </div>
            <p className="text-sm text-gray-600">Use your own AI provider API keys for direct billing</p>
            <div className="mt-2 text-sm font-medium text-green-600">Pay only for what you use</div>
          </button>
        </div>
      </div>

      {/* Subscription Content */}
      {billingMode === "subscription" && (
        <>
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-900">{t("billing.current_plan.title")}</h3>
            <p className="mt-1 text-gray-600">{t("billing.current_plan.description")}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">{t("billing.payment_method.title")}</h3>
            <div className="flex justify-between items-center p-4 rounded-md border">
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-gray-100 rounded-md">
                  <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 14c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{t("billing.payment_method.card")}</p>
                  <p className="text-sm text-gray-500">{t("billing.payment_method.expires")}</p>
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
        </>
      )}

      {/* BYOK Content */}
      {billingMode === "byok" && (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4 className="font-medium text-blue-900">Secure API Key Storage</h4>
                <p className="mt-1 text-sm text-blue-700">
                  Your API keys are encrypted and stored securely. We never log or store your API requests.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Configure Your AI Provider API Keys</h3>

            {/* OpenAI */}
            <div className="p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 bg-green-100 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">OpenAI</h4>
                    <p className="text-sm text-gray-500">GPT-4, GPT-3.5, DALL-E</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    apiKeys.openai ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {apiKeys.openai ? "Configured" : "Not Set"}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showApiKeys.openai ? "text" : "password"}
                  value={apiKeys.openai}
                  onChange={(e) => handleApiKeyChange("openai", e.target.value)}
                  placeholder="sk-..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#3800b3] focus:ring-[#3800b3] pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggleApiKeyVisibility("openai")}
                  className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                >
                  {showApiKeys.openai ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Google AI */}
            <div className="p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Google AI</h4>
                    <p className="text-sm text-gray-500">Gemini Pro, Gemini Vision</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    apiKeys.google ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {apiKeys.google ? "Configured" : "Not Set"}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showApiKeys.google ? "text" : "password"}
                  value={apiKeys.google}
                  onChange={(e) => handleApiKeyChange("google", e.target.value)}
                  placeholder="AIza..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#3800b3] focus:ring-[#3800b3] pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggleApiKeyVisibility("google")}
                  className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                >
                  {showApiKeys.google ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* xAI */}
            <div className="p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 bg-gray-100 rounded-lg">
                    <span className="text-sm font-bold text-gray-700">𝕏</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">xAI (Grok)</h4>
                    <p className="text-sm text-gray-500">Grok-3, Grok-2</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    apiKeys.xai ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {apiKeys.xai ? "Configured" : "Not Set"}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showApiKeys.xai ? "text" : "password"}
                  value={apiKeys.xai}
                  onChange={(e) => handleApiKeyChange("xai", e.target.value)}
                  placeholder="xai-..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#3800b3] focus:ring-[#3800b3] pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggleApiKeyVisibility("xai")}
                  className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                >
                  {showApiKeys.xai ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Anthropic */}
            <div className="p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="flex justify-center items-center mr-3 w-8 h-8 bg-orange-100 rounded-lg">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Anthropic</h4>
                    <p className="text-sm text-gray-500">Claude 3.5 Sonnet, Claude 3</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    apiKeys.anthropic ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {apiKeys.anthropic ? "Configured" : "Not Set"}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showApiKeys.anthropic ? "text" : "password"}
                  value={apiKeys.anthropic}
                  onChange={(e) => handleApiKeyChange("anthropic", e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#3800b3] focus:ring-[#3800b3] pr-10"
                />
                <button
                  type="button"
                  onClick={() => toggleApiKeyVisibility("anthropic")}
                  className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                >
                  {showApiKeys.anthropic ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={saveApiKeys}
              className="px-4 py-2 bg-[#3800b3] text-white rounded-md hover:bg-[#2d0091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3800b3]"
            >
              Save API Keys
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

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
              <div className="mb-2 w-full h-24 bg-white rounded border border-gray-200"></div>
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
              <div className="mb-2 w-full h-24 bg-gray-800 rounded border border-gray-700"></div>
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
        <div className="flex justify-between items-center">
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
        <div className="flex justify-between items-center">
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
      <div className="p-4 bg-red-50 rounded-md">
        <h3 className="font-medium text-red-800">
          {t("delete.warning.title")}
        </h3>
        <p className="mt-1 text-red-700">{t("delete.warning.description")}</p>
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
        <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          {t("delete.delete_button")}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
