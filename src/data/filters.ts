export const dummyFilters: Filter[] = [
    // TODO: Lägg till key-value par i options-arrayen (ex. 50m²: 50)
    {
        name: 'Size',
        options: ['50m²', '20m²', '100m²'],
        selectedOptions: []
    },
    {
        name: 'Number of rooms',
        options: ['1', '2', '3', '4', '5'],
        selectedOptions: []
    },
    {
        name: 'Events',
        options: ['Ghost hunting', 'Dance party', 'Photoshoot', 'Guided tour'],
        selectedOptions: []
    },
    {
        name: 'Amneties',
        options: ['Pets allowed', 'Breakfast included', 'Lunch included', 'Gym nearby'],
        selectedOptions: []
    }
]