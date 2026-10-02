import { useEffect, useMemo, useState } from "react";

import {
  FaBell,
  FaBoxOpen,
  FaCheck,
  FaCheckDouble,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // all | unread | read
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "ARM - Notifications";
    fetchNotifications();
  }, []);

  // ============================================================
  // FETCH NOTIFICATIONS
  // ============================================================

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();

      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // MARK SINGLE NOTIFICATION AS READ
  // ============================================================

  const handleRead = async (id) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // ============================================================
  // MARK ALL AS READ
  // ============================================================

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  // ============================================================
  // COUNTS
  // ============================================================

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const readCount = notifications.length - unreadCount;

  // ============================================================
  // FILTER
  // ============================================================

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((notification) => !notification.isRead);
    }

    if (filter === "read") {
      return notifications.filter((notification) => notification.isRead);
    }

    return notifications;
  }, [notifications, filter]);

  // ============================================================
  // NOTIFICATION TITLE
  // ============================================================

  const getNotificationTitle = (notification) => {
    if (notification.action === "WAREHOUSE_STOCK_UPDATED") {
      return "Warehouse Stock Updated";
    }

    return notification.action || "Notification";
  };

  // ============================================================
  // NOTIFICATION ICON
  // ============================================================

  const getNotificationIcon = (notification) => {
    const action = notification.action?.toLowerCase() || "";

    if (notification.type === "inventory") {
      return <FaBoxOpen size={13} />;
    }

    if (action.includes("order")) {
      return <FaShoppingCart size={13} />;
    }

    if (action.includes("user")) {
      return <FaUsers size={13} />;
    }

    return <FaBell size={13} />;
  };

  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============================================================
  // GROUP BY DATE
  // ============================================================

  const groupedNotifications = useMemo(() => {
    const groups = {};

    filteredNotifications.forEach((notification) => {
      const date = new Date(notification.createdAt);

      const key = date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(notification);
    });

    return groups;
  }, [filteredNotifications]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-full bg-[#F7F6F3] text-[#172033]">
        <div className="max-w-[1500px] mx-auto p-1">
          <div className="animate-pulse">
            <div className="h-3 w-28 bg-[#E5E0D8] rounded mb-3" />

            <div className="h-9 w-64 bg-[#E5E0D8] rounded mb-3" />

            <div className="h-4 w-80 bg-[#E5E0D8] rounded" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="min-h-full bg-[#F7F6F3] text-[#172033]">
      <div className="max-w-[1500px] mx-auto">
        {/* ======================================================
            HEADER
        ======================================================= */}

        <div className="mb-7">
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-end
              sm:justify-between
              gap-5
            "
          >
            {/* LEFT SIDE */}

            <div>
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  font-semibold
                  text-[#A51E27]
                  mb-2
                "
              >
                Activity Center
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="
                    w-10
                    h-10
                    rounded-[11px]

                    flex
                    items-center
                    justify-center

                    bg-[#F5E9EB]
                    text-[#A51E27]

                    border
                    border-[#E8D5D8]
                  "
                >
                  <FaBell size={16} />
                </div>

                <h1
                  className="
                    text-[30px]
                    md:text-[34px]

                    font-semibold

                    tracking-[-0.04em]

                    text-[#172033]
                  "
                >
                  Notifications
                </h1>
              </div>

              <p
                className="
                  mt-2
                  text-[13px]
                  text-[#7B8492]
                "
              >
                Everything happening across your CRM, in one place.
              </p>
            </div>

            {/* MARK ALL AS READ */}

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2

                  h-[40px]

                  px-4

                  rounded-[10px]

                  bg-[#172033]

                  text-white

                  text-[11px]
                  font-medium

                  shadow-[0_4px_14px_rgba(23,32,51,0.12)]

                  hover:bg-[#273247]

                  transition-all
                "
              >
                <FaCheckDouble size={11} className="text-[#D6B56D]" />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* ======================================================
            FILTER BAR
        ======================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between

            gap-4

            mb-8

            pb-4

            border-b
            border-[#E3DDD4]
          "
        >
          {/* FILTER BUTTONS */}

          <div className="flex items-center gap-1">
            {/* ALL */}

            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`
                px-4
                py-2

                rounded-[8px]

                text-[11px]
                font-medium

                transition-all

                ${
                  filter === "all"
                    ? "bg-[#8F1729] text-white shadow-[0_4px_12px_rgba(143,23,41,0.16)]"
                    : "text-[#737D8C] hover:bg-[#EEEAE4]"
                }
              `}
            >
              All Activity
            </button>

            {/* UNREAD */}

            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`
                px-4
                py-2

                rounded-[8px]

                text-[11px]
                font-medium

                transition-all

                ${
                  filter === "unread"
                    ? "bg-[#8F1729] text-white shadow-[0_4px_12px_rgba(143,23,41,0.16)]"
                    : "text-[#737D8C] hover:bg-[#EEEAE4]"
                }
              `}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2 opacity-80">{unreadCount}</span>
              )}
            </button>

            {/* READ */}

            <button
              type="button"
              onClick={() => setFilter("read")}
              className={`
                px-4
                py-2

                rounded-[8px]

                text-[11px]
                font-medium

                transition-all

                ${
                  filter === "read"
                    ? "bg-[#8F1729] text-white shadow-[0_4px_12px_rgba(143,23,41,0.16)]"
                    : "text-[#737D8C] hover:bg-[#EEEAE4]"
                }
              `}
            >
              Read
              {readCount > 0 && filter === "read" && (
                <span className="ml-2 opacity-80">{readCount}</span>
              )}
            </button>
          </div>

          {/* ACTIVITY COUNT */}

          <div
            className="
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-[#9A948A]
            "
          >
            {filteredNotifications.length}{" "}
            {filteredNotifications.length === 1 ? "activity" : "activities"}
          </div>
        </div>

        {/* ======================================================
            EMPTY STATE
        ======================================================= */}

        {filteredNotifications.length === 0 ? (
          <div className="py-20 text-center">
            <div
              className="
                mx-auto

                w-12
                h-12

                rounded-[14px]

                flex
                items-center
                justify-center

                bg-[#F5E9EB]
                text-[#A51E27]

                border
                border-[#E8D5D8]
              "
            >
              <FaBell size={17} />
            </div>

            <h3
              className="
                mt-4
                text-[14px]
                font-semibold
                text-[#172033]
              "
            >
              {filter === "unread"
                ? "You're all caught up"
                : "No notifications"}
            </h3>

            <p
              className="
                mt-1
                text-[11px]
                text-[#9299A4]
              "
            >
              {filter === "unread"
                ? "There are no unread activities."
                : "Product and inventory changes will appear here."}
            </p>
          </div>
        ) : (
          /* ====================================================
             NOTIFICATION DATE GROUPS
          ===================================================== */

          <div>
            {Object.entries(groupedNotifications).map(([date, items]) => (
              <div key={date} className="mb-10">
                {/* DATE HEADER */}

                <div
                  className="
                      flex
                      items-center
                      gap-4
                      mb-5
                    "
                >
                  <span
                    className="
                        text-[12px]
                        uppercase
                        tracking-[0.18em]
                        
                        text-[#8A929E]
                        whitespace-nowrap
                      "
                  >
                    {date}
                  </span>

                  <div
                    className="
                        flex-1
                        h-px
                        bg-[#E3DDD4]
                      "
                  />
                </div>

                {/* ==================================================
                      TIMELINE
                  =================================================== */}

                <div className="relative">
                  {/* Vertical timeline line */}

                  <div
                    className="
                        absolute
                        left-[89px]
                        top-2
                        bottom-2
                        w-px
                        bg-[#DDD6CC]
                      "
                  />

                  {items.map((notification) => {
                    const isUnread = !notification.isRead;

                    return (
                      <div
                        key={notification._id}
                        className="
                            relative

                            grid
                            grid-cols-[70px_38px_minmax(0,1fr)]

                            mb-7

                            group
                          "
                      >
                        {/* ==================================================
                              TIME
                          =================================================== */}

                        <div
                          className="
                              text-right
                              pr-4
                              pt-[1px]
                            "
                        >
                          <span
                            className="
                                text-[10px]
                                font-medium
                                text-[#6F7887]
                                whitespace-nowrap
                              "
                          >
                            {formatTime(notification.createdAt)}
                          </span>
                        </div>

                        {/* ==================================================
                              TIMELINE NODE
                          =================================================== */}

                        <div
                          className="
                              relative
                              flex
                              justify-center
                            "
                        >
                          <span
                            className={
                              isUnread
                                ? `
                                    relative
                                    z-10

                                    mt-[2px]

                                    w-[10px]
                                    h-[10px]

                                    rounded-full

                                    border-[3px]
                                    border-[#F7F6F3]

                                    bg-[#A51E27]

                                    shadow-[0_0_0_1px_#CDAEB3]
                                  `
                                : `
                                    relative
                                    z-10

                                    mt-[2px]

                                    w-[10px]
                                    h-[10px]

                                    rounded-full

                                    border-[3px]
                                    border-[#F7F6F3]

                                    bg-[#B9B2A8]

                                    shadow-[0_0_0_1px_#D0C9BF]
                                  `
                            }
                          />
                        </div>

                        {/* ==================================================
                              NOTIFICATION CONTENT
                          =================================================== */}

                        <div
                          className="
                              min-w-0
                              ml-3
                              pb-1

                              transition-transform
                              duration-200

                              group-hover:translate-x-[2px]
                            "
                        >
                          {/* =================================================
                                FIRST LINE
                            ================================================== */}

                          <div
                            className="
                                flex
                                items-center
                                gap-2
                              "
                          >
                            {/* ICON */}

                            <div
                              className={
                                isUnread
                                  ? `
                                      w-7
                                      h-7

                                      rounded-[8px]

                                      flex
                                      items-center
                                      justify-center

                                      shrink-0

                                      bg-[#F5E9EB]

                                      text-[#A51E27]
                                    `
                                  : `
                                      w-7
                                      h-7

                                      rounded-[8px]

                                      flex
                                      items-center
                                      justify-center

                                      shrink-0

                                      bg-[#F0EDE8]

                                      text-[#7D8490]
                                    `
                              }
                            >
                              {getNotificationIcon(notification)}
                            </div>

                            {/* TITLE */}

                            <h3
                              className={
                                isUnread
                                  ? "text-[13px] font-semibold text-[#172033]"
                                  : "text-[13px] font-semibold text-[#596476]"
                              }
                            >
                              {getNotificationTitle(notification)}
                            </h3>

                            {/* NEW BADGE */}

                            {isUnread && (
                              <span
                                className="
                                    px-1.5
                                    py-[2px]

                                    rounded-[4px]

                                    bg-[#F5E9EB]

                                    text-[#A51E27]

                                    text-[10px]

                                    uppercase
                                    tracking-[0.08em]

                                    font-semibold
                                  "
                              >
                                New
                              </span>
                            )}
                          </div>

                          {/* =================================================
                                SECOND LINE
                            ================================================== */}

                          <p
                            className="
                                mt-1

                                text-[13px]
                                leading-5

                                text-[#697386]

                                truncate

                                max-w-[1000px]
                              "
                          >
                            {notification.message}

                            {notification.productName && (
                              <>
                                {" · "}

                                <span className="text-[#858D99]">
                                  Product: {notification.productName}
                                </span>
                              </>
                            )}

                            {notification.warehouse && (
                              <>
                                {" · "}

                                <span className="text-[#858D99]">
                                  Warehouse: {notification.warehouse}
                                </span>
                              </>
                            )}

                            {notification.userEmail && (
                              <>
                                {" · "}

                                <span className="text-[#858D99]">
                                  By: {notification.userEmail}
                                </span>
                              </>
                            )}
                          </p>

                          {/* =================================================
                                MARK AS READ
                            ================================================== */}

                          {isUnread && (
                            <button
                              type="button"
                              onClick={() => handleRead(notification._id)}
                              className="
                                  mt-2

                                  inline-flex
                                  items-center
                                  gap-1.5

                                  text-[9px]
                                  font-medium

                                  text-[#8A929E]

                                  hover:text-[#A51E27]

                                  transition
                                "
                            >
                              <FaCheck size={8} />
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

// import { useEffect, useState } from "react";
// import { FaBell, FaBoxOpen, FaCheck, FaCheckDouble } from "react-icons/fa";

// import {
//   getNotifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
// } from "../services/notificationService";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     document.title = "ARM - Notifications";
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const res = await getNotifications();

//       setNotifications(res.data);
//     } catch (error) {
//       console.error("Failed to fetch notifications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRead = async (id) => {
//     try {
//       await markNotificationAsRead(id);

//       setNotifications((prev) =>
//         prev.map((notification) =>
//           notification._id === id
//             ? { ...notification, isRead: true }
//             : notification,
//         ),
//       );
//     } catch (error) {
//       console.error("Failed to mark notification as read:", error);
//     }
//   };

//   const handleMarkAllRead = async () => {
//     try {
//       await markAllNotificationsAsRead();

//       setNotifications((prev) =>
//         prev.map((notification) => ({
//           ...notification,
//           isRead: true,
//         })),
//       );
//     } catch (error) {
//       console.error("Failed to mark all notifications as read:", error);
//     }
//   };

//   const unreadCount = notifications.filter(
//     (notification) => !notification.isRead,
//   ).length;

//   if (loading) {
//     return (
//       <div className="p-6">
//         <p className="text-gray-500">Loading notifications...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-1">
//       {/* Header */}

//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <div>
//           <div className="flex items-center gap-3">
//             <FaBell className="text-[#a51e27] text-2xl" />

//             <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
//           </div>

//           <p className="text-gray-500 mt-1">
//             Track changes and activities in your CRM
//           </p>
//         </div>

//         {unreadCount > 0 && (
//           <button
//             onClick={handleMarkAllRead}
//             className="flex items-center gap-2 bg-[#a51e27] text-white px-4 py-2 rounded-lg hover:opacity-90"
//           >
//             <FaCheckDouble />
//             Mark all as read
//           </button>
//         )}
//       </div>

//       {/* Summary */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white border rounded-xl p-4">
//           <p className="text-sm text-gray-500">Total Notifications</p>

//           <h2 className="text-2xl font-bold mt-1">{notifications.length}</h2>
//         </div>

//         <div className="bg-white border rounded-xl p-4">
//           <p className="text-sm text-gray-500">Unread</p>

//           <h2 className="text-2xl font-bold text-[#a51e27] mt-1">
//             {unreadCount}
//           </h2>
//         </div>

//         <div className="bg-white border rounded-xl p-4">
//           <p className="text-sm text-gray-500">Read</p>

//           <h2 className="text-2xl font-bold text-green-600 mt-1">
//             {notifications.length - unreadCount}
//           </h2>
//         </div>
//       </div>

//       {/* Notifications */}

//       <div className="bg-white border rounded-xl overflow-hidden">
//         {notifications.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <FaBell className="text-4xl text-gray-300 mb-3" />

//             <h3 className="text-lg font-semibold text-gray-600">
//               No notifications
//             </h3>

//             <p className="text-sm text-gray-400 mt-1">
//               Product and inventory changes will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="divide-y">
//             {notifications.map((notification) => (
//               <div
//                 key={notification._id}
//                 className={`p-5 flex gap-4 transition ${
//                   !notification.isRead ? "bg-red-50" : "bg-white"
//                 }`}
//               >
//                 {/* Icon */}

//                 <div
//                   className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
//                     notification.type === "inventory"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   <FaBoxOpen />
//                 </div>

//                 {/* Content */}

//                 <div className="flex-1">
//                   <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {notification.action === "WAREHOUSE_STOCK_UPDATED"
//                           ? "Warehouse Stock Updated"
//                           : notification.action}
//                       </h3>

//                       <p className="text-gray-600 mt-1">
//                         {notification.message}
//                       </p>
//                     </div>

//                     {!notification.isRead && (
//                       <span className="text-xs bg-[#a51e27] text-white px-2 py-1 rounded-full">
//                         New
//                       </span>
//                     )}
//                   </div>

//                   {/* Details */}

//                   <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-gray-500">
//                     <span>
//                       <strong>Product:</strong>{" "}
//                       {notification.productName || "-"}
//                     </span>

//                     {notification.warehouse && (
//                       <span>
//                         <strong>Warehouse:</strong> {notification.warehouse}
//                       </span>
//                     )}

//                     <span>
//                       <strong>Changed by:</strong> {notification.userEmail}
//                     </span>

//                     <span>
//                       {new Date(notification.createdAt).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Read button */}

//                 {!notification.isRead && (
//                   <button
//                     onClick={() => handleRead(notification._id)}
//                     title="Mark as read"
//                     className="text-gray-400 hover:text-green-600"
//                   >
//                     <FaCheck />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notifications;
