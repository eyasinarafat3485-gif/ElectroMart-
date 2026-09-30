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
  ShieldCheck,
  Calendar,
  DollarSign
} from "lucide-react";
import { toast } from "react-toastify";

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
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  rejected: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Processing",
  confirmed: "Confirmed",
  delivered: "Delivered",
  rejected: "Cancelled",
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
      const res = await fetch(`${API}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      const res = await fetch(`${API}/orders/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      setUpdatingId(id);
      setUpdatingAction(status);

      const res = await fetch(`${API}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
        toast.success(`Order marked as ${STATUS_LABEL[status].toLowerCase()}`);
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong updating order");
    } finally {
      setUpdatingId("");
      setUpdatingAction("");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!API) return;

    try {
      setUpdatingId(id);
      setUpdatingAction("delete");

      const res = await fetch(`${API}/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Delete failed (${res.status})`);
      }

      const result: DeleteResult = await res.json();

      if (result.deletedCount > 0) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        setTotalOrders((prev) => Math.max(0, prev - 1));
        toast.success("Order record deleted");
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong deleting order");
    } finally {
      setUpdatingId("");
      setUpdatingAction("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
        <p className="text-xs text-slate-400 tracking-widest uppercase font-semibold">Loading Order Stream...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#030712] py-12 px-4 md:px-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-slate-800/80 pb-6 mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              Admin Operations
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white tracking-tight">
              Order <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Live customer orders &amp; nationwide shipment fulfillment control.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="bg-cyan-500/10 rounded-xl p-2.5 text-cyan-400 border border-cyan-500/20">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">Total Orders Stream</p>
              <h2 className="text-2xl font-black text-white">{totalOrders} Items</h2>
            </div>
          </div>
        </div>

        {/* Orders Table & Mobile List */}
        <div>
          {orders.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 py-16 text-center">
              <Package className="mx-auto mb-3 h-12 w-12 text-slate-600" />
              <h2 className="text-xl font-bold text-white">No Customer Orders Yet</h2>
              <p className="mt-1 text-xs text-slate-400">New orders from across Bangladesh will appear here automatically.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-800/90 bg-slate-900/60 shadow-2xl backdrop-blur-xl">
                <table className="min-w-full divide-y divide-slate-800">
                  <thead className="bg-slate-950/60">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Price (৳)</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((order) => {
                      const isRowBusy = updatingId === order._id;
                      const isFinal = order.status === "delivered" || order.status === "rejected";

                      return (
                        <tr
                          key={order._id}
                          className="hover:bg-slate-800/40 transition-colors duration-200"
                        >
                          {/* Product */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                                <img
                                  src={order.imageUrl || "/placeholder.png"}
                                  alt={order.productTitle}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
                                  }}
                                />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1 max-w-[200px]">
                                  {order.productTitle}
                                </h3>
                                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                  ID: {order.productId}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Customer */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                {order.userName?.[0]?.toUpperCase() || "U"}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-xs text-white truncate">{order.userName}</p>
                                <a
                                  href={`mailto:${order.userEmail}`}
                                  className="block truncate text-[11px] text-cyan-400 hover:underline"
                                >
                                  {order.userEmail}
                                </a>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4 font-black text-white text-xs sm:text-sm">
                            ৳ {(order.price ?? 0).toLocaleString('en-IN')}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${STATUS_BADGE[order.status]}`}>
                              {STATUS_LABEL[order.status]}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                            {new Date(order.orderedAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Confirm */}
                              <button
                                type="button"
                                title="Confirm Order"
                                disabled={isRowBusy || order.status !== "pending"}
                                onClick={() => updateStatus(order._id, "confirmed")}
                                className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                {isRowBusy && updatingAction === "confirmed" ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-3.5 w-3.5" />
                                )}
                              </button>

                              {/* Deliver */}
                              <button
                                type="button"
                                title="Mark Delivered"
                                disabled={isRowBusy || order.status !== "confirmed"}
                                onClick={() => updateStatus(order._id, "delivered")}
                                className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                {isRowBusy && updatingAction === "delivered" ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Truck className="h-3.5 w-3.5" />
                                )}
                              </button>

                              {/* Reject */}
                              <button
                                type="button"
                                title="Cancel Order"
                                disabled={isRowBusy || isFinal}
                                onClick={() => updateStatus(order._id, "rejected")}
                                className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                {isRowBusy && updatingAction === "rejected" ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <XCircle className="h-3.5 w-3.5" />
                                )}
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                title="Delete Order Record"
                                disabled={isRowBusy}
                                onClick={() => deleteOrder(order._id)}
                                className="p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:bg-rose-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                              >
                                {isRowBusy && updatingAction === "delete" ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List */}
              <div className="md:hidden space-y-4">
                {orders.map((order) => {
                  const isRowBusy = updatingId === order._id;
                  const isFinal = order.status === "delivered" || order.status === "rejected";

                  return (
                    <div
                      key={order._id}
                      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl space-y-4 backdrop-blur-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={order.imageUrl || "/placeholder.png"}
                            alt={order.productTitle}
                            className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 object-contain p-1 shrink-0"
                          />
                          <div className="min-w-0">
                            <h3 className="font-bold text-white text-xs line-clamp-2">
                              {order.productTitle}
                            </h3>
                            <p className="text-[10px] text-slate-400">ID: {order.productId}</p>
                          </div>
                        </div>

                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${STATUS_BADGE[order.status]}`}>
                          {STATUS_LABEL[order.status]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
                        <div>
                          <p className="text-slate-400 text-[10px]">Customer</p>
                          <p className="font-bold text-white">{order.userName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-[10px]">Price (৳)</p>
                          <p className="font-bold text-cyan-400">৳ {(order.price ?? 0).toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          disabled={isRowBusy || order.status !== "pending"}
                          onClick={() => updateStatus(order._id, "confirmed")}
                          className="flex items-center justify-center py-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 disabled:opacity-30"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          disabled={isRowBusy || order.status !== "confirmed"}
                          onClick={() => updateStatus(order._id, "delivered")}
                          className="flex items-center justify-center py-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 disabled:opacity-30"
                        >
                          <Truck className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          disabled={isRowBusy || isFinal}
                          onClick={() => updateStatus(order._id, "rejected")}
                          className="flex items-center justify-center py-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 disabled:opacity-30"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          disabled={isRowBusy}
                          onClick={() => deleteOrder(order._id)}
                          className="flex items-center justify-center py-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 disabled:opacity-30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}