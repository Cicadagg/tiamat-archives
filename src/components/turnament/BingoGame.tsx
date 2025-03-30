import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import './Bingo.css';

export const BingoGame = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [bingoGrid, setBingoGrid] = useState<string[]>(() => {
        const storedGrid = localStorage.getItem('bingoGrid');
        return storedGrid ? JSON.parse(storedGrid) : Array(16).fill('');
    });
    const [squareTexts, setSquareTexts] = useState<string[]>(() => {
        const storedTexts = localStorage.getItem('squareTexts');
        return storedTexts ? JSON.parse(storedTexts) : Array(16).fill('');
    });
    const [difficulty, setDifficulty] = useState<string>(() => {
        return localStorage.getItem('difficulty') || 'Легко';
    });
    const [showConfirmationColor, setShowConfirmationColor] = useState(false);
    const [showConfirmationText, setShowConfirmationText] = useState(false);

    const queryClient = useQueryClient();
    const bingos = queryClient.getQueryData('bingo') as any[];

    useEffect(() => {
        localStorage.setItem('difficulty', difficulty);
    }, [difficulty]);

    const handleSquareClick = (index: number) => {
        if (!selectedColor) return;

        setBingoGrid(prev => {
            const newGrid = [...prev];
            const currentColor = newGrid[index];

            if (!currentColor) {
                newGrid[index] = selectedColor;
            } else if (currentColor === selectedColor) {
                newGrid[index] = '';
            } else if (currentColor.includes(',')) {
                const colors = currentColor.split(',');
                if (colors.includes(selectedColor)) {
                    newGrid[index] = colors.filter(color => color !== selectedColor).join(',');
                    if (!newGrid[index].includes(',')) {
                        newGrid[index] = newGrid[index] || '';
                    }
                } else {
                    console.log('Добавление третьего цвета не реализовано');
                }
            } else {
                newGrid[index] = `${currentColor},${selectedColor}`;
            }

            return newGrid;
        });
    };

    const handleResetColorClick = () => {
        setShowConfirmationColor(true);
    };

    const handleConfirmResetColor = () => {
        setShowConfirmationColor(false);
        setBingoGrid(Array(16).fill(''));
        localStorage.removeItem('bingoGrid');
    };

    const handleCancelResetColor = () => {
        setShowConfirmationColor(false);
    };

    const handleResetTextClick = () => {
        setShowConfirmationText(true);
    };

    const handleConfirmResetText = () => {
        setShowConfirmationText(false);
        setSquareTexts(Array(16).fill(''));
        localStorage.removeItem('squareTexts');
    };

    const handleCancelResetText = () => {
        setShowConfirmationText(false);
    };

    const getSquareStyle = (index: number) => {
        const square = bingoGrid[index];
        if (square.includes(',')) {
            const colors = square.split(',');
            if (colors.length === 2) {
                const yellowColor = '#f7dc6f';
                const topColor = colors.includes(yellowColor) ? colors.filter(color => color !== yellowColor)[0] : colors[0];
                const bottomColor = yellowColor;
                return {
                    background: `linear-gradient(to bottom left, ${topColor} 50%, ${bottomColor} 50%)`
                };
            } else if (colors.length === 1) {
                return { backgroundColor: colors[0] || 'transparent' };
            } else {
                console.log('Больше двух цветов не реализовано');
                return { backgroundColor: 'transparent' };
            }
        } else {
            return { backgroundColor: square || '#ccc' };
        }
    };

    useEffect(() => {
        localStorage.setItem('bingoGrid', JSON.stringify(bingoGrid));
        localStorage.setItem('squareTexts', JSON.stringify(squareTexts));
    }, [bingoGrid, squareTexts]);

    return (
        <div className="bingo-container">
            <h2>Bingo Game</h2>
            <div className="color-selector">
                <button
                    className={`color-button yellow ${selectedColor === '#f7dc6f' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('#f7dc6f')}
                >
                    <span className="refreshtext">Yellow</span>
                </button>
                <button
                    className={`color-button purple ${selectedColor === '#7a288a' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('#7a288a')}
                >
                    <span className="refreshtext">Purple</span>
                </button>
                <button
                    className="refresh-button"
                    onClick={() => resetSquareTexts()}
                >
                    <span className="refreshtext">Refresh Text</span>
                </button>
                <button
                    className="refresh-button"
                    onClick={handleResetColorClick}
                >
                    <span className="refreshtext">Reset Color</span>
                </button>
                <button
                    className="refresh-button"
                    onClick={handleResetTextClick}
                >
                    <span className="refreshtext">Reset Text</span>
                </button>
            </div>

            <div className="main-content">
                <div className="bingo-grid">
                    {Array(16).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className="bingo-square"
                            onClick={() => handleSquareClick(index)}
                            style={getSquareStyle(index)}
                        >
                            <span className="bingo-square-text">{squareTexts[index]}</span>
                        </div>
                    ))}
                </div>

                <div className="difficulty-controls">
                    <input
                        type="range"
                        className="difficulty-slider"
                        min="0"
                        max="2"
                        value={difficulty === 'Легко' ? '0' : difficulty === 'Средне' ? '1' : '2'}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '0') setDifficulty('Легко');
                            else if (value === '1') setDifficulty('Средне');
                            else setDifficulty('Сложно');
                        }}
                    />
                    <div className="difficulty-labels">
                        <span>Сложно</span>
                        <span>Средне</span>
                        <span>Легко</span>
                    </div>
                </div>
            </div>

            {showConfirmationColor && (
                <div className="confirmation-dialog">
                    <p>Вы уверены, что хотите сбросить цвета?</p>
                    <button onClick={handleConfirmResetColor}>Да</button>
                    <button onClick={handleCancelResetColor}>Нет</button>
                </div>
            )}

            {showConfirmationText && (
                <div className="confirmation-dialog">
                    <p>Вы уверены, что хотите сбросить текст?</p>
                    <button onClick={handleConfirmResetText}>Да</button>
                    <button onClick={handleCancelResetText}>Нет</button>
                </div>
            )}
        </div>
    );

    function resetSquareTexts() {
        let availableNames: string[] = [];

        switch (difficulty) {
            case 'Легко':
                availableNames = bingos.slice(0, 16).map(bingo => bingo?.name1 || `Square ${bingos.indexOf(bingo) + 1}`);
                break;
            case 'Средне':
                availableNames = bingos.slice(0, 16).map(bingo => bingo?.name2 || `Square ${bingos.indexOf(bingo) + 1}`);
                break;
            case 'Сложно':
                availableNames = bingos.slice(0, 16).map(bingo => bingo?.name3 || `Square ${bingos.indexOf(bingo) + 1}`);
                break;
            default:
                availableNames = bingos.map(bingo => bingo?.name || `Square ${bingos.indexOf(bingo) + 1}`);
        }

        const shuffledNames = [...availableNames];

        for (let i = shuffledNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
        }

        const newSquareTexts = shuffledNames.slice(0, 16);

        if (newSquareTexts.length < 16) {
            for (let i = newSquareTexts.length; i < 16; i++) {
                newSquareTexts.push(`Square ${i + 1}`);
            }
        }

        setSquareTexts(newSquareTexts);
    }
};
