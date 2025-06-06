const optionsLineHome = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Date'
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Test(s)'
            }
        }
    }
};

export default optionsLineHome;