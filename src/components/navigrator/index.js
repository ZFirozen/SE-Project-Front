import React from "react";
import './index.css'
import { NavLink } from "react-router-dom";

const forms = [
    {
        link: 'entrustment',
        name: '委托查看'
    },
    {
        link: 'formfill',
        name: '委托填写'
    },
];

export default function Navigator() {
    return (
        <ul
            className="navigator"
        >
            <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/"
                    key="/"
                >
                    首页
                </NavLink>
            </li>
            <li className="has-sub-nav main-navigator-link">
                委托
                <ul className="sub-navigator">
                    {forms.map(form => {
                        return (
                            <li key={form.name}>
                                <NavLink
                                    className="navigator-link"
                                    style={({ isActive }) => {
                                        return {
                                            background: isActive ? '#8282e3' : '#494998'
                                        }
                                    }}
                                    to={`/${form.link}`}
                                    key={form.link}
                                >
                                    {form.name}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </li>
            {/* <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/entrustment"
                >
                    委托查看
                </NavLink>
            </li> */}
            {/* <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/formfill"
                >
                    委托填写
                </NavLink>
            </li> */}
            <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/samples"
                >
                    样品
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/contract"
                    key="/contract"
                >
                    {/*合同 */}
                    开发中
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/status"
                    key="/status"
                > {/*状态 */}
                    合同
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/login"
                >
                    登录
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/userinfo"
                >
                    账户信息
                </NavLink>
            </li>
        </ul>
    )
}