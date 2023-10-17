import { Route, Routes } from "react-router-dom";
import React from "react";
import { Home, SignUp, Login, Chat, SMEList, DetailSME } from "./page";

function CasaApp() {
  return (
    <Routes>
      <Route path="/smelist" element={<SMEList />} />
      <Route path="/detailsme/:id" element={<DetailSME />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/callback" element={<Home />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default CasaApp;
