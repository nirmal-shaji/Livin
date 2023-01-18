import React, { useState, useEffect } from "react";
import "./Layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../redux/actions/authActions";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { adminNotification, deleteAdminNotification } from "../../../api/adminApi";
import { Modal } from "@mantine/core";
import "./Layout.css";
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Layout({ children }) {
  const [notification, setNotifiction] = useState([])
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const adminMenu = [
    {
      name: "Home",
      path: "/admin",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Posts",
      path: "/admin/posts",
      icon: "ri-user-line"

    }
  ];
  useEffect( () => {
    const noti = async() => {
     const { data } = await adminNotification();
    setNotifiction(data.reports); 
    }
    noti();


  }, [])
  console.log(notification)
  const deleteNotification = async () => {
    await deleteAdminNotification();
    setOpened(false)
  }

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="text-black text-center" style={{ fontSize: '25px' }}>Livin</h1>
          </div>
          <div className="menu">
            {adminMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${isActive && "active-menu-item" //head
                    }`}
                  onClick={() => {
                    navigate(menu.path);
                  }}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                dispatch(adminLogout())
                navigate("/admin");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                class="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-3">
          

              <h4 className="anchor">
                admin
              </h4>

              <a href="#" class="notification">
                <span onClick={() => setOpened(true)}><NotificationsActiveIcon /></span>
                <span class="badge">{notification.length}</span>
              </a>

            </div>
          </div>

          <Modal overflow="inside" opened={opened}
            onClose={() => setOpened(false)} title="Notification-center">     <Card shadow="sm" p="lg" radius="md" withBorder>

              <Group position="apart" mt="md" mb="xs">
                {notification[0] ?
                  
                  <>
                    <Text weight={500}>New post report: ({notification.length})
                    <Text size="sm" color="dimmed" onClick={deleteNotification}>

                    <Link to="/admin/posts" onClick={() => setOpened(false)}>view reports</Link>

                  </Text>
                  </Text>
                  <Text size="sm" color="dimmed" onClick={deleteNotification}>


                    mark as read
                    </Text>
                    </>
                :
                  <Text weight={500}>
                    No new notifications
                  </Text>}


              </Group>




            </Card></Modal>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;