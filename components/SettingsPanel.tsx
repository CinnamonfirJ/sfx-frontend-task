"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock } from "lucide-react";

export default function SettingsPanel() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <div className='space-y-6 max-w-3xl'>
      {/* Account Settings */}
      <Card className='border-gray-200'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Lock size={20} />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>
              Full Name
            </label>
            <Input defaultValue='Martins Chidume' className='border-gray-200' />
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>
              Email Address
            </label>
            <Input
              defaultValue='martins@example.com'
              type='email'
              className='border-gray-200'
            />
          </div>
          <div>
            <label className='block mb-1 font-medium text-gray-700 text-sm'>
              Phone Number
            </label>
            <Input
              defaultValue='+234 801 234 5678'
              className='border-gray-200'
            />
          </div>
          <Button className='bg-purple-600 hover:bg-purple-700 text-white'>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className='border-gray-200'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Bell size={20} />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {[
            {
              key: "email",
              label: "Email Notifications",
              desc: "Receive updates via email",
            },
            {
              key: "sms",
              label: "SMS Notifications",
              desc: "Receive alerts via SMS",
            },
            {
              key: "push",
              label: "Push Notifications",
              desc: "Receive browser notifications",
            },
          ].map((notif) => (
            <div
              key={notif.key}
              className='flex justify-between items-center bg-gray-50 p-3 rounded-lg'
            >
              <div>
                <p className='font-medium text-gray-900'>{notif.label}</p>
                <p className='text-gray-600 text-sm'>{notif.desc}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    [notif.key]:
                      !notifications[notif.key as keyof typeof notifications],
                  })
                }
                className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors ${
                  notifications[notif.key as keyof typeof notifications]
                    ? "bg-purple-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    notifications[notif.key as keyof typeof notifications]
                      ? "translate-x-4"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card className='border-gray-200'>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button variant='outline' className='border-gray-200 w-full'>
            Change Password
          </Button>
          <Button variant='outline' className='border-gray-200 w-full'>
            Two-Factor Authentication
          </Button>
          <Button
            variant='outline'
            className='hover:bg-red-50 border-red-200 w-full text-red-600'
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
