import React from 'react';
import './App.css';
import { RepoInput } from './components/RepoInput';
import { KanbanBoard } from './components/KanbanBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { Breadcrumbs } from './components/Breadcrumbs';



function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="p-3 app-container">
          <RepoInput />
          <Breadcrumbs />
          <KanbanBoard />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
