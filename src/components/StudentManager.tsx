import React, { useRef } from 'react';
import { X, Upload, CheckSquare, Square, Trash2, Users } from 'lucide-react';
import { Student } from '../types';
import { parseExcelFile } from '../utils/excelParser';

interface StudentManagerProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const StudentManager: React.FC<StudentManagerProps> = ({ 
  isOpen, 
  onClose, 
  students, 
  setStudents 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const newStudents = await parseExcelFile(e.target.files[0]);
        // If list is empty, just set it. If not, append.
        setStudents(prev => {
           if (prev.length === 0) return newStudents;
           return [...prev, ...newStudents];
        });
        
        // Reset file input so the same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
      } catch (err) {
        alert("Excel 解析失败，请确保文件格式正确（例如：第一列为姓名）。");
      }
    }
  };

  const toggleStudent = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const toggleAll = (active: boolean) => {
    setStudents(prev => prev.map(s => ({ ...s, active })));
  };

  const clearAll = () => {
    if (students.length === 0) return;

    const inactiveCount = students.filter(s => !s.active).length;

    // Logic 1: If there are unselected students, ask to delete ONLY them.
    if (inactiveCount > 0) {
       if(window.confirm(`检测到有 ${inactiveCount} 位未选中的学生。\n\n是否删除这些未选中的学生？\n（点击“确定”删除未选中项，点击“取消”可选择清空全部）`)) {
           setStudents(prev => prev.filter(s => s.active));
           return;
       }
    }

    // Logic 2 (Fallback or Default): Clear EVERYTHING.
    // This runs if inactiveCount == 0 OR if the user cancelled the specific delete above.
    if(window.confirm("确定要清空所有学生名单吗？\n\n注意：此操作将删除所有数据，您需要重新导入。")) {
        setStudents([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
  }

  const activeCount = students.filter(s => s.active).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden border-4 border-gold-main">
        
        {/* Header */}
        <div className="bg-china-red p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-gold-main" />
            <h2 className="text-xl font-bold font-sans">点名范围设置</h2>
          </div>
          <button type="button" onClick={onClose} className="hover:bg-red-800 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-gray-50 border-b flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
             <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold shadow-sm transition-transform active:scale-95"
             >
                <Upload className="w-4 h-4" /> 导入 Excel
             </button>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".xlsx, .xls" 
                onChange={handleFileUpload}
             />
             <button 
                type="button"
                onClick={clearAll} 
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer border border-transparent hover:border-red-200"
             >
                <Trash2 className="w-4 h-4" /> 清空名单
             </button>
          </div>
          
          <div className="text-sm font-bold text-gray-600">
            已选: <span className="text-china-red text-lg">{activeCount}</span> / {students.length}
          </div>
        </div>

        {/* Action Bar for Selection */}
        <div className="px-4 py-2 bg-gray-100 flex gap-4 text-sm border-b">
            <button type="button" onClick={() => toggleAll(true)} className="text-blue-600 font-bold hover:underline">全选</button>
            <button type="button" onClick={() => toggleAll(false)} className="text-gray-500 hover:underline">取消全选</button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50">
          {students.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-10">
                <Upload className="w-12 h-12 mb-2 opacity-50"/>
                <p>暂无学生，请导入 Excel 文件！</p>
            </div>
          ) : (
            students.map(student => (
                <button
                    key={student.id}
                    type="button"
                    onClick={() => toggleStudent(student.id)}
                    className={`
                        flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                        ${student.active 
                            ? 'bg-white border-china-red shadow-md' 
                            : 'bg-gray-100 border-transparent opacity-60 grayscale'}
                    `}
                >
                    {student.active ? (
                        <CheckSquare className="w-5 h-5 text-china-red shrink-0" />
                    ) : (
                        <Square className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                    <span className={`font-bold truncate ${student.active ? 'text-gray-900' : 'text-gray-500'}`}>
                        {student.name}
                    </span>
                </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white flex justify-end">
            <button 
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-china-red text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-colors"
            >
                确定
            </button>
        </div>

      </div>
    </div>
  );
};
