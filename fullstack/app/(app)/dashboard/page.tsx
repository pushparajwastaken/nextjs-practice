"use client";

import { toast } from "sonner";
import { Message } from "@/model/user.model";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { Loader2, RefreshCcw, Trash2 } from "lucide-react";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessage: false,
    },
  });

  const { watch, setValue } = form;
  const acceptMessages = watch("acceptMessage");

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((m) => m._id.toString() !== messageId));
  };

  // 🔹 Fetch Accept Message Setting
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");

      setValue("acceptMessage", response.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // 🔹 Fetch Messages
  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/get-messages");

      setMessages(response.data.messages || []);

      if (refresh) {
        toast("Refreshed Messages", {
          description: "Showing Latest Messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error", {
        description:
          axiosError.response?.data.message || "Failed to fetch messages",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔹 Toggle Accept Messages
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessage", !acceptMessages);

      toast(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error", {
        description:
          axiosError.response?.data.message || "Failed to update setting",
      });
    }
  };

  useEffect(() => {
    if (!session?.user) return;

    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchMessages, fetchAcceptMessage]);

  if (!session?.user) return <div>Please Login</div>;

  // ================= UI =================

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Button
          variant="outline"
          size="icon"
          onClick={() => fetchMessages(true)}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      {/* 🔹 Accept Messages Toggle */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Accept Anonymous Messages</span>

        {isSwitchLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <Switch
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
          />
        )}
      </div>

      <Separator />

      {/* 🔹 Messages List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Messages</h2>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-muted-foreground">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message._id.toString()}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <p>{message.content}</p>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteMessage(message._id.toString())}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
