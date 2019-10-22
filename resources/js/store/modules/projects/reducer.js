const INITIAL_STATE = {
    projects: [
        {
            id: 1,
            title: "Test Project 1"
        },
        {
            id: 2,
            title: "Test Project 2"
        },
        {
            id: 3,
            title: "Test Project 3"
        },
        {
            id: 4,
            title: "Test Project 4"
        },
    ]
}

export default function reducer (state = INITIAL_STATE, action){
    switch (action.type) {
        
        default:
            return state;
    }
}