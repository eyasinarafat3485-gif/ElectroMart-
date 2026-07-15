"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import {
  Package,
  Loader2,
  CheckCircle,
  Truck,
  XCircle,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";


type OrderStatus = "pending" | "confirmed" | "delivered" | "rejected";

interface Order {
  _id: string;

  userId: string;
  userName: string;
  userEmail: string;
  userImage: string;

  productId: string;
  productTitle: string;
  imageUrl: string;

  price: number;

  orderedAt: string;
  status: OrderStatus;
}

interface UpdateResult {
  modifiedCount: number;
  matchedCount?: number;
}

interface DeleteResult {
  deletedCount: number;
}

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const STATUS_BADGE: Record<OrderStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  delivered: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  delivered: "Delivered",
  rejected: "Rejected",
};

export default function OrderManagePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string>("");
  const [updatingAction, setUpdatingAction] = useState<
    OrderStatus | "delete" | ""
  >("");


  const fetchOrders = useCallback(async () => {
    if (!API) return;

    try {
      // const { data: tokenData } = await authClient.token();

      const res = await fetch(`${API}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "authorization": `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load orders (${res.status})`);
      }

      const data: Order[] = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    }
  }, []);

  const fetchCount = useCallback(async () => {
    if (!API) return;

    try {
      // const { data: tokenData } = await authClient.token();
      const res = await fetch(`${API}/orders/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "authorization": `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load order count (${res.status})`);
      }

      const data: { totalOrders: number } = await res.json();
      setTotalOrders(data.totalOrders);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load order count");
    }
  }, []);


  useEffect(() => {
    if (!API) {
      console.error("NEXT_PUBLIC_SERVER_URL is not set");
      toast.error("Server URL is not configured");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchCount()]);
      setLoading(false);
    };

    loadData();
  }, [fetchOrders, fetchCount]);


  const updateStatus = async (id: string, status: OrderStatus) => {
    if (!API) return;

    try {
      // const { data: tokenData } = await authClient.token();
      setUpdatingId(id);
      setUpdatingAction(status);

      const res = await fetch(`${API}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // "authorization": `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error(`Update failed (${res.status})`);
      }

      const result: UpdateResult = await res.json();

      if (result.modifiedCount > 0) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, status } : order
          )
        );
        toast.success(`Order ${STATUS_LABEL[status].toLowerCase()} successfully`);
      } else {
        toast.error("Failed to update order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setUpdatingId("");
      setUpdatingAction("");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!API) return;
    // if (!window.confirm("Delete this order? This cannot be undone.")) return;

    try {
      // const { data: tokenData } = await authClient.token();
      setUpdatingId(id);
      setUpdatingAction("delete");

      const res = await fetch(`${API}/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // "authorization": `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Delete failed (${res.status})`);
      }

      const result: DeleteResult = await res.json();

      if (result.deletedCount > 0) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        setTotalOrders((prev) => Math.max(0, prev - 1));
        toast.success("Order deleted successfully");
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setUpdatingId("");
      setUpdatingAction("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 pt-30 pb-15 px-4 md:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Order
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Management
            </span>
          </h1>
          <p className="mt-2 text-slate-400 text-lg leading-8">
            Manage every customer order from one place.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl px-8 py-5 flex items-center gap-5 shadow-lg">
          <div className="bg-cyan-500/10 rounded-xl p-3">
            <Package className="text-cyan-400 w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Orders</p>
            <h2 className="text-3xl font-bold text-white">{totalOrders}</h2>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="mt-10">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 text-center">
            <Package className="mx-auto mb-4 h-14 w-14 text-slate-600" />
            <h2 className="text-2xl font-semibold text-white">
              No Orders Found
            </h2>
            <p className="mt-2 text-slate-400">
              There are no customer orders available.
            </p>
          </div>
        ) : (
          <>
            {/* ---------- Desktop / Tablet Table (md and up) ---------- */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
              <table className="min-w-full">
                <thead className="bg-slate-800">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Product
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Price
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => {
                    const isRowBusy = updatingId === order._id;
                    const isFinal =
                      order.status === "delivered" ||
                      order.status === "rejected";

                    return (
                      <tr
                        key={order._id}
                        className="border-t border-slate-800 hover:bg-slate-800/40 transition-all duration-300"
                      >
                        {/* Product */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <Image
                              src={order.imageUrl || "/placeholder.png"}
                              alt={order.productTitle}
                              width={60}
                              height={60}
                              className="rounded-lg border border-slate-700 object-cover"
                              unoptimized
                            />
                            <div>
                              <h3 className="font-semibold text-white line-clamp-2 max-w-[180px]">
                                {order.productTitle}
                              </h3>
                              <p className="text-xs text-slate-400">
                                ID : {order.productId}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-slate-700 shadow-md shrink-0">
                              <Image
                                src={order.userImage || "/placeholder.png"}
                                alt={order.userName}
                                fill
                                className="object-cover object-center"
                                unoptimized
                              />
                            </div>

                            <div className="min-w-0">
                              <h4 className="truncate font-semibold text-white">
                                {order.userName}
                              </h4>

                              <a
                                href={`mailto:${order.userEmail}`}
                                className="block truncate text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                              >
                                {order.userEmail}
                              </a>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-5 font-bold text-green-400">
                          ৳ {(order.price ?? 0).toLocaleString()}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGE[order.status]}`}
                          >
                            {STATUS_LABEL[order.status]}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5 text-sm text-slate-300 whitespace-nowrap">
                          {new Date(order.orderedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap justify-center gap-2">
                            {/* Confirm */}
                            <button
                              type="button"
                              title="Confirm order"
                              disabled={isRowBusy || order.status !== "pending"}
                              onClick={() => updateStatus(order._id, "confirmed")}
                              className="rounded-lg bg-blue-600 px-3 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isRowBusy && updatingAction === "confirmed" ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-white" />
                              )}
                            </button>

                            {/* Deliver */}
                            <button
                              type="button"
                              title="Mark as delivered"
                              disabled={isRowBusy || order.status !== "confirmed"}
                              onClick={() => updateStatus(order._id, "delivered")}
                              className="rounded-lg bg-green-600 px-3 py-2 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isRowBusy && updatingAction === "delivered" ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                              ) : (
                                <Truck className="h-4 w-4 text-white" />
                              )}
                            </button>

                            {/* Reject */}
                            <button
                              type="button"
                              title="Reject order"
                              disabled={isRowBusy || isFinal}
                              onClick={() => {
                                updateStatus(order._id, "rejected");
                              }}
                              className="rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isRowBusy && updatingAction === "rejected" ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                              ) : (
                                <XCircle className="h-4 w-4 text-white" />
                              )}
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              title="Delete order"
                              disabled={isRowBusy}
                              onClick={() => deleteOrder(order._id)}
                              className="rounded-lg bg-slate-700 px-3 py-2 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isRowBusy && updatingAction === "delete" ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-white" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
                <p className="text-slate-400">Showing</p>
                <p className="font-semibold text-white">
                  {orders.length} Orders
                </p>
              </div>
            </div>

            {/* ---------- Mobile Card List (below md) ---------- */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => {
                const isRowBusy = updatingId === order._id;
                const isFinal =
                  order.status === "delivered" || order.status === "rejected";

                return (
                  <div
                    key={order._id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg"
                  >
                    {/* Row 1: Product + Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Image
                          src={order.imageUrl || "/placeholder.png"}
                          alt={order.productTitle}
                          width={56}
                          height={56}
                          className="rounded-lg border border-slate-700 object-cover shrink-0"
                          unoptimized
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-white text-sm line-clamp-2">
                            {order.productTitle}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">
                            ID : {order.productId}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${STATUS_BADGE[order.status]}`}
                      >
                        {STATUS_LABEL[order.status]}
                      </span>
                    </div>

                    {/* Row 2: Customer */}
                    <div className="mt-4 flex items-center gap-3 border-t border-slate-800 pt-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-700 shadow-md shrink-0">
                        <Image
                          src={order.userImage || "/placeholder.png"}
                          alt={order.userName}
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold text-white text-sm">
                          {order.userName}
                        </h4>
                        <a
                          href={`mailto:${order.userEmail}`}
                          className="block truncate text-xs text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                        >
                          {order.userEmail}
                        </a>
                      </div>
                    </div>

                    {/* Row 3: Price + Date */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4 text-sm">
                      <div>
                        <p className="text-slate-500 text-xs">Price</p>
                        <p className="font-bold text-green-400">
                          ৳ {(order.price ?? 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-xs">Date</p>
                        <p className="text-slate-300 whitespace-nowrap">
                          {new Date(order.orderedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Row 4: Actions */}
                    <div className="mt-4 grid grid-cols-4 gap-2 border-t border-slate-800 pt-4">
                      {/* Confirm */}
                      <button
                        type="button"
                        title="Confirm order"
                        disabled={isRowBusy || order.status !== "pending"}
                        onClick={() => updateStatus(order._id, "confirmed")}
                        className="flex items-center justify-center rounded-lg bg-blue-600 py-2.5 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRowBusy && updatingAction === "confirmed" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                      </button>

                      {/* Deliver */}
                      <button
                        type="button"
                        title="Mark as delivered"
                        disabled={isRowBusy || order.status !== "confirmed"}
                        onClick={() => updateStatus(order._id, "delivered")}
                        className="flex items-center justify-center rounded-lg bg-green-600 py-2.5 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRowBusy && updatingAction === "delivered" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          <Truck className="h-4 w-4 text-white" />
                        )}
                      </button>

                      {/* Reject */}
                      <button
                        type="button"
                        title="Reject order"
                        disabled={isRowBusy || isFinal}
                        onClick={() => {
                          updateStatus(order._id, "rejected");
                        }}
                        className="flex items-center justify-center rounded-lg bg-red-600 py-2.5 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRowBusy && updatingAction === "rejected" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          <XCircle className="h-4 w-4 text-white" />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        title="Delete order"
                        disabled={isRowBusy}
                        onClick={() => deleteOrder(order._id)}
                        className="flex items-center justify-center rounded-lg bg-slate-700 py-2.5 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRowBusy && updatingAction === "delete" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
                <p className="text-slate-400 text-sm">Showing</p>
                <p className="font-semibold text-white text-sm">
                  {orders.length} Orders
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}