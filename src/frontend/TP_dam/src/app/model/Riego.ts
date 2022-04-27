export class Riego{
    private _riegoId: number;
    private _fecha: Date; 
    private _apertura: number;
    private _electrovalvulaId: number;

    constructor(riegoId,fecha,apertura,electrovalvulaId){
        this._riegoId=riegoId;
        this.fecha=fecha;
        this._apertura=apertura;
        this._electrovalvulaId=electrovalvulaId;
    }

    public get riegoId(): number {
        return this._riegoId;
    }
    public set riegoId(value: number) {
        this._riegoId = value;
    }

    public get fecha(): Date {
        return this._fecha;
    }
    public set fecha(value: Date) {
        this._fecha = value;
    }

    public get apertura(): number {
        return this._apertura;
    }
    public set apertura(value: number) {
        this._apertura = value;
    }
    
    public get electrovalvulaId(): number {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value: number) {
        this._electrovalvulaId = value;
    }
}