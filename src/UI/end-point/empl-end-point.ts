import Employee from '../types/employee';

class EmplEndPoint {
    public getAll(): Promise<any> {
        return fetch("/employee")
    }

    public getByID(id: string): Promise<any> {
        return fetch("/employee/" + id)
    }

    public post(empl: Employee): Promise<any> {
        return fetch("/employee", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(empl),
        })
    }

    public put(empl: Employee): Promise<any> {
        return fetch("/employee", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(empl),
        })
    }    
    
    public delete(id: string): Promise<any> {
        return fetch("/employee/"+ id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
        })
    }
}

const emplEndPoint = new EmplEndPoint()
export default emplEndPoint

