import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Results",
      paths: ["/results"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/results"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/login"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },

  ];
  const adminMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Polls",
      paths: ["/admin/polls"],
      icon: <i className="ri-file-list-line"></i>,
      onClick: () => navigate("/admin/polls"),
    },
    {
      title: "Results",
      paths: ["/admin/result"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/admin/result"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const getUserData = async () => {
    try {
      const response = await getUserInfo();

      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const activeRoute = window.location.pathname;
  return (
    <div className="layout">
      <div  className="flex gap-2  w-full h-full h-100">
      <div className="sidebar">
      <div className="menu">
            {menu.map((item, index) => {
              return (
                <div 
                className={`menu-item ${activeRoute === item.paths[0] && 'active-menu-item'}`}
                key={index}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </div>
              );
            })}
          </div>
      </div>
      <div className="body">
        <div className="header flex justify-between">
        {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            {collapsed && (
              <i
                className="ri-menu-line"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
        <h1 className="text-2xl text-white">Online Voting</h1>
        <div className="flex items-center gap-1">
        <i class="ri-user-fill"></i>
        <h1 className="text-md underline text-white">{user?.name}</h1>
        </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
    </div>
    
  );
}

export default ProtectedRoute;
