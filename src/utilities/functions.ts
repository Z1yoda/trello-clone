function getData(): any[] {
    let data: any[] = [];
    if (localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos') || '');
    }

    return data;
}

export default getData;
