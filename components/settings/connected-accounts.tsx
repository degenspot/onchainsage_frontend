"use client";

import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/theme.store";

export default function ConnectedAccounts() {
  const { connectedAccounts, connectAccount, disconnectAccount } =
    useSettingsStore();

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>

      <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg mb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </div>
          <div>
            <p className="font-medium">Twitter</p>
            <p className="text-sm text-gray-400">
              Connect your Twitter account
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            connectedAccounts.twitter
              ? disconnectAccount("twitter")
              : connectAccount("twitter")
          }
        >
          {connectedAccounts.twitter ? "Disconnect" : "Connect"}
        </Button>
      </div>

      <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-orange-500 rounded-md flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
            </svg>
          </div>
          <div>
            <p className="font-medium">Reddit</p>
            <p className="text-sm text-gray-400">Connect your Reddit account</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            connectedAccounts.reddit
              ? disconnectAccount("reddit")
              : connectAccount("reddit")
          }
        >
          {connectedAccounts.reddit ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  );
}
