import {Doctor, NewDoctor} from "@/app/interface/Doctor";

export class DoctorService {

    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }

    async createDoctor(data: NewDoctor) {
        return this.request('/api/doctor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    async getDoctorById(id: string) {
        return this.request(`/api/doctor/${id}`, { method: 'GET' });
    }

    async getAllDoctors(): Promise<Doctor[]> {
        return this.request('/api/doctor', { method: 'GET' });
    }

    async updateDoctor(doctor: Doctor) {
        return this.request(`/api/doctor/${doctor.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: doctor.name,
                description: doctor.description,
                cpf: doctor.cpf,
                CRM: doctor.CRM,
            }),
        });
    }

    async deleteDoctor(id: string) {
        return this.request(`/api/doctor/${id}`, { method: 'DELETE' });
    }

    async searchDoctorsByNameAndStatus(name: string, status: boolean): Promise<Doctor[]> {
        const params = new URLSearchParams({ name, status: status.toString() });
        return this.request(`/api/doctor/search?${params.toString()}`, { method: 'GET' });
    }
}