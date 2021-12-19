export const AQI_LEVEL = {
    'green': {
        level: 'good',
        primaryColor: '#84cc16',
        secondaryColor: '#bef264',
        textColor: '#3f6212',
description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
    },
    'yellow': {
        level: 'moderate',
        primaryColor: '#eab308',
        secondaryColor: '#fde047',
        textColor: '#854d0e',
        description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
    },
    'orange': {
        level: 'Unhealthy for Sensitive Groups',
        primaryColor: '#f97316',
        secondaryColor: '#fdba74',
        textColor: '#9a3412',
        description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
    },
    'red': {
        level: 'Unhealthy',
        primaryColor: '#ef4444',
        secondaryColor: '#fca5a5',
        textColor: '#991b1b',
        description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'
    },
    'purple': {
        level: 'Very Unhealthy',
        primaryColor: '#a855f7',
        secondaryColor: '#d8b4fe',
        textColor: '#6b21a8',
        description: 'Health alert: The risk of health effects is increased for everyone.'
    },
    'maroon': {
        level: 'Hazardous',
        primaryColor: '#800000',
        secondaryColor: '#e11d48',
        textColor: '#800000',
        description: 'Health warning of emergency conditions: everyone is more likely to be affected'
    }
}