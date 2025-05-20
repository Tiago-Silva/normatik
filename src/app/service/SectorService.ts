import {NewSector, Sector} from "@/app/interface/Sector";


export class SectorService {
    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }

    async createSector(data: NewSector) {
        return this.request('/api/sector', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    async updateSector(sector: Sector) {
        return this.request(`/api/sector/${sector.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: sector.name,
                nameRef: sector.nameRef,
                description: sector.description ?? undefined,
                internalCode: sector.internalCode ?? undefined,
                status: sector.status,
                sendDescription: sector.sendDescription ?? undefined,
                includeBuilding: sector.includeBuilding ?? undefined,
                branchId: sector.branchId ?? undefined,
                companyId: sector.companyId,
            })
        })
    }

    async getSectorsByCompanyIdAndStatus(companyId: number, status: boolean): Promise<Sector[]> {
        return this.request(`/api/sector/search?companyId=${companyId}&status=${status}`, { method: 'GET' });
    }

}