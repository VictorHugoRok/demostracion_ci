import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('crudItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Guardar items en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('crudItems', JSON.stringify(items));
  }, [items]);

  // CREATE
  const handleAdd = () => {
    if (inputValue.trim()) {
      const newItem = {
        id: Date.now(),
        text: inputValue
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  // UPDATE
  const handleEdit = (id) => {
    const item = items.find(item => item.id === id);
    setEditingId(id);
    setEditValue(item.text);
  };

  const handleSave = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, text: editValue } : item
    ));
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  // DELETE
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Cambio a mi programa - CRUD Básico</p>

        <div className="crud-container">
          {/* CREATE - Formulario de entrada */}
          <div className="create-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Agregar nuevo item..."
              className="create-input"
            />
            <button onClick={handleAdd} className="add-button">
              Agregar
            </button>
          </div>

          {/* READ - Lista de items */}
          <div className="items-list">
            {items.length === 0 ? (
              <p className="empty-message">
                No hay items. Agrega uno arriba.
              </p>
            ) : (
              items.map(item => (
                <div key={item.id} className="item-card">
                  {editingId === item.id ? (
                    // Modo edición
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="edit-input"
                      />
                      <button
                        onClick={() => handleSave(item.id)}
                        className="btn btn-save"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-cancel"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    // Modo vista
                    <>
                      <span className="item-text">{item.text}</span>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="btn btn-edit"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-delete"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
