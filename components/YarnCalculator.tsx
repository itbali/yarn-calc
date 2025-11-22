'use client';

import { useState, useEffect } from 'react';
import { Scissors, Weight, Ruler, Layers, Trash2, Plus, CheckCircle2, Info, AlertCircle } from 'lucide-react';

interface YarnInput {
  id: number;
  weight: string;
  length: string;
  strands: string;
}

interface ValidationErrors {
  [key: number]: {
    weight?: string;
    length?: string;
    strands?: string;
  };
}

export default function YarnCalculator() {
  const [yarns, setYarns] = useState<YarnInput[]>([
    { id: 1, weight: '100', length: '700', strands: '2' },
    { id: 2, weight: '25', length: '120', strands: '1' },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const addYarn = () => {
    const newId = Math.max(...yarns.map(y => y.id), 0) + 1;
    setYarns([...yarns, { id: newId, weight: '100', length: '', strands: '1' }]);
  };

  const removeYarn = (id: number) => {
    if (yarns.length > 1) {
      setYarns(yarns.filter(y => y.id !== id));
    }
  };

  const updateYarn = (id: number, field: keyof YarnInput, value: string) => {
    setYarns(yarns.map(y =>
      y.id === id ? { ...y, [field]: value } : y
    ));
  };

  const validateYarn = (yarn: YarnInput): { weight?: string; length?: string; strands?: string } => {
    const fieldErrors: { weight?: string; length?: string; strands?: string } = {};

    const weight = parseFloat(yarn.weight);
    const length = parseFloat(yarn.length);
    const strands = parseInt(yarn.strands);

    if (!yarn.weight || isNaN(weight) || weight <= 0) {
      fieldErrors.weight = 'Вес должен быть больше 0';
    }

    if (!yarn.length || isNaN(length) || length < 0) {
      fieldErrors.length = 'Длина не может быть отрицательной';
    }

    if (!yarn.strands || isNaN(strands) || strands < 1) {
      fieldErrors.strands = 'Должна быть минимум 1 нить';
    }

    return fieldErrors;
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    yarns.forEach(yarn => {
      const fieldErrors = validateYarn(yarn);
      if (Object.keys(fieldErrors).length > 0) {
        newErrors[yarn.id] = fieldErrors;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const calculateTotalMeterage = () => {
    // Приводим все к метражу на 100г для каждой нити
    let reciprocalSum = 0;

    for (const yarn of yarns) {
      const weight = parseFloat(yarn.weight);
      const length = parseFloat(yarn.length);
      const strands = parseInt(yarn.strands);

      // Метраж одной нити на 100г
      const meteragePerStrand = (length / weight) * 100;

      // Добавляем столько раз, сколько нитей
      for (let i = 0; i < strands; i++) {
        reciprocalSum += 1 / meteragePerStrand;
      }
    }

    // Итоговый метраж на 100г
    const totalMeterage = 1 / reciprocalSum;
    setResult(totalMeterage);
  };

  const getTotalStrands = () => {
    return yarns.reduce((sum, yarn) => sum + (parseInt(yarn.strands) || 0), 0);
  };

  // Автоматический расчет при изменении данных
  useEffect(() => {
    if (validateAll()) {
      calculateTotalMeterage();
    } else {
      setResult(null);
    }
  }, [yarns]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Scissors className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-purple-600 dark:text-purple-400" />
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-purple-900 dark:text-purple-300">
              Калькулятор пряжи
            </h1>
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
            Расчет метража при сложении нескольких нитей
          </p>
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 py-2 px-3 rounded-lg">
            <Info className="w-4 h-4" />
            <span>Результат обновляется автоматически</span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {yarns.map((yarn, index) => (
              <div
                key={yarn.id}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-purple-800 dark:text-purple-300">
                    Пряжа {index + 1}
                  </h3>
                  {yarns.length > 1 && (
                    <button
                      onClick={() => removeYarn(yarn.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1.5 sm:p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                      aria-label="Удалить пряжу"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 w-24 sm:w-28 flex-shrink-0">
                      <Weight className="w-3 h-3 sm:w-4 sm:h-4" />
                      Вес (г)
                    </label>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={yarn.weight}
                        onChange={(e) => updateYarn(yarn.id, 'weight', e.target.value)}
                        placeholder="100"
                        className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border-2 rounded-lg focus:ring-2 dark:bg-gray-700 dark:text-white ${
                          errors[yarn.id]?.weight
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent'
                        }`}
                        min="0"
                        step="0.1"
                      />
                      {errors[yarn.id]?.weight && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          {errors[yarn.id].weight}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 w-24 sm:w-28 flex-shrink-0">
                      <Ruler className="w-3 h-3 sm:w-4 sm:h-4" />
                      Длина (м)
                    </label>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={yarn.length}
                        onChange={(e) => updateYarn(yarn.id, 'length', e.target.value)}
                        placeholder="700"
                        className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border-2 rounded-lg focus:ring-2 dark:bg-gray-700 dark:text-white ${
                          errors[yarn.id]?.length
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent'
                        }`}
                        min="0"
                        step="0.1"
                      />
                      {errors[yarn.id]?.length && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          {errors[yarn.id].length}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 w-24 sm:w-28 flex-shrink-0">
                      <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                      Нитей
                    </label>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={yarn.strands}
                        onChange={(e) => updateYarn(yarn.id, 'strands', e.target.value)}
                        placeholder="2"
                        className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border-2 rounded-lg focus:ring-2 dark:bg-gray-700 dark:text-white ${
                          errors[yarn.id]?.strands
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-purple-300 dark:border-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent'
                        }`}
                        min="1"
                        step="1"
                      />
                      {errors[yarn.id]?.strands && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          {errors[yarn.id].strands}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Метраж на 100г: {parseFloat(yarn.weight) > 0 ? ((parseFloat(yarn.length) / parseFloat(yarn.weight)) * 100).toFixed(2) : 0} м
                </div>
              </div>
            ))}

            <button
              onClick={addYarn}
              className="w-full py-2 sm:py-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-600 hover:bg-purple-200 dark:hover:bg-purple-800/30 transition font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Добавить пряжу
            </button>

            {result !== null && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg md:rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600 dark:text-green-400" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 dark:text-green-300">
                    Результат
                  </h2>
                </div>
                <div className="space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Всего нитей:</span> {getTotalStrands()} шт
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-400 mt-2">
                    {result.toFixed(2)} м / 100г
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 md:p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg md:rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-300">
                  Как это работает?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                При сложении нескольких нитей пряжи вместе, итоговый метраж рассчитывается по формуле:
                <br />
                <code className="block mt-2 p-2 bg-white dark:bg-gray-800 rounded text-xs">
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
