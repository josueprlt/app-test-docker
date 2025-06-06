const optionsLineDelay = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        x: {
            type: 'linear',
            display: true,
            title: {
                display: true,
                text: 'Étapes',
            },
            ticks: {
                precision: 0
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Temps (ms)',
            },
            suggestedMin: 0
        }
    }
};

export default optionsLineDelay;