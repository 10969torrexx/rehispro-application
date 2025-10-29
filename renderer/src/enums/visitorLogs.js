export const Status = {
    PENDING: 'pending',
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
}

export const Color = {
    [Status.PENDING]: 'blue',
    [Status.ONGOING]: 'yellow',
    [Status.COMPLETED]: 'green',
    [Status.CANCELLED]: 'red',
}