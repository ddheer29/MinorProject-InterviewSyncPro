import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
  const UserId=localStorage.getItem('auth');
    return UserId ? <Outlet/> : <Navigate to="/signin"/>
}
