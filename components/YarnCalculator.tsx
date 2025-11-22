'use client';

import { useState } from 'react';
import { Scissors, Weight, Ruler, Layers, Trash2, Plus, Calculator, CheckCircle2, Info } from 'lucide-react';

interface YarnInput {
  id: number;
  weight: number;
  length: number;
  strands: number;
}

export default function YarnCalculator() {
  const [yarns, setYarns] = useState<YarnInput[]>([
    { id: 1, weight: 100, length: 700, strands: 2 },
    { id: 2, weight: 25, length: 120, strands: 1 },
  ]);
  const [result, setResult] = useState<number | null>(null);

  const addYarn = () => {
    const newId = Math.max(...yarns.map(y => y.id), 0) + 1;
    setYarns([...yarns, { id: newId, weight: 100, length: 0, strands: 1 }]);
  };

  const removeYarn = (id: number) => {
    if (yarns.length > 1) {
      setYarns(yarns.filter(y => y.id !== id));
    }
  };

  const updateYarn = (id: number, field: keyof YarnInput, value: number) => {
    setYarns(yarns.map(y =>
      y.id === id ? { ...y, [field]: value } : y
    ));
  };

  const calculateTotalMeterage = () => {
    // Приводим все к метражу на 100г для каждой нити
    let reciprocalSum = 0;

    for (const yarn of yarns) {
      // Метраж одной нити на 100г
      const meteragePerStrand = (yarn.length / yarn.weight) * 100;

      // Добавляем столько раз, сколько нитей
      for (let i = 0; i < yarn.strands; i++) {
        reciprocalSum += 1 / meteragePerStrand;
      }
    }

    // Итоговый метраж на 100г
    const totalMeterage = 1 / reciprocalSum;
    setResult(totalMeterage);
  };

  const getTotalStrands = () => {
    return yarns.reduce((sum, yarn) => sum + yarn.strands, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Scissors className="w-8 h-8 md:w-10 md:h-10 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-900 dark:text-purple-300">
              Калькулятор пряжи
            </h1>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Расчет метража при сложении нескольких нитей
          </p>

          <div className="space-y-6">
            {yarns.map((yarn, index) => (
              <div
                key={yarn.id}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">
                    Пряжа {index + 1}
                  </h3>
                  {yarns.length > 1 && (
                    <button
                      onClick={() => removeYarn(yarn.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                      aria-label="Удалить пряжу"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Weight className="w-4 h-4" />
                      Вес (грамм)
                    </label>
                    <input
                      type="number"
                      value={yarn.weight}
                      onChange={(e) => updateYarn(yarn.id, 'weight', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border-2 border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Ruler className="w-4 h-4" />
                      Длина (метров)
                    </label>
                    <input
                      type="number"
                      value={yarn.length}
                      onChange={(e) => updateYarn(yarn.id, 'length', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border-2 border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Layers className="w-4 h-4" />
                      Количество нитей
                    </label>
                    <input
                      type="number"
                      value={yarn.strands}
                      onChange={(e) => updateYarn(yarn.id, 'strands', parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2 border-2 border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Метраж на 100г: {yarn.weight > 0 ? ((yarn.length / yarn.weight) * 100).toFixed(2) : 0} м
                </div>
              </div>
            ))}

            <button
              onClick={addYarn}
              className="w-full py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-600 hover:bg-purple-200 dark:hover:bg-purple-800/30 transition font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Добавить пряжу
            </button>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={calculateTotalMeterage}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calculator className="w-6 h-6" />
                Рассчитать
              </button>
            </div>

            {result !== null && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
                    Результат
                  </h2>
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Всего нитей:</span> {getTotalStrands()} шт
                  </p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400 mt-3">
                    {result.toFixed(2)} м / 100г
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-300">
                  Как это работает?
                </h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                При сложении нескольких нитей пряжи вместе, итоговый метраж рассчитывается по формуле:
                <br />
                <code className="block mt-2 p-2 bg-white dark:bg-gray-800 rounded">
                  1/итог = 1/метраж₁ + 1/метраж₂ + ... + 1/метражₙ
                </code>
                <br />
                Где каждый метраж приведен к 100 граммам и учитывает количество нитей.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
