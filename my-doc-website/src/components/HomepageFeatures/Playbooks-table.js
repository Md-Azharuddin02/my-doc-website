import React, { useState, useEffect, useRef } from 'react';

function ResponsiveTable() {
  const [rightColumnData, setRightColumnData] = useState('');
  const [editableRightColumn, setEditableRightColumn] = useState(false);
  const rightColumnRef = useRef(null);

  // Load data from local storage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('rightColumnData');
    if (savedData) {
      setRightColumnData(savedData);
    }
  }, []);

  // Save data to local storage when right column data changes
  useEffect(() => {
    if (editableRightColumn) {
      localStorage.setItem('rightColumnData', rightColumnData);
    }
  }, [rightColumnData, editableRightColumn]);

  const handleEditButtonClick = () => {
    setEditableRightColumn(true);
    adjustTextAreaHeight();
  };

  const handleSaveButtonClick = () => {
    setEditableRightColumn(false);
  };

  const handleRightColumnChange = (e) => {
    setRightColumnData(e.target.value);
    adjustTextAreaHeight();
  };

  const adjustTextAreaHeight = () => {
    if (rightColumnRef.current) {
      const { scrollHeight } = rightColumnRef.current;
      rightColumnRef.current.style.height = 'auto';
      rightColumnRef.current.style.height = `${scrollHeight}px`;
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ width: '20%' , height:'100%' }}>Left Column (Editable)</th>
            <th style={{ width: '80%', height:'100%'  }}>Right Column (Fixed)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '20%' }} contentEditable={true}>
              Editable Content
            </td>
            <td style={{ width: '80%' }}>
              {editableRightColumn ? (
                <textarea
                  ref={rightColumnRef}
                  value={rightColumnData}
                  onChange={handleRightColumnChange}
                  style={{ width: '100%', minHeight: '100px', resize: 'none' }}
                />
              ) : (
                <div>{rightColumnData}</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {editableRightColumn ? (
        <button onClick={handleSaveButtonClick}>Save</button>
      ) : (
        <button onClick={handleEditButtonClick}>Edit Right Column</button>
      )}
    </div>
  );
}

export default ResponsiveTable;
