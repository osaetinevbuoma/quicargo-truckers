import sequelize, {
  DataTypes,
  Model,
  Optional
} from "sequelize";
import db from "../db";
import Location from "./Location";

export interface TruckAttributes {
  id?: string;
  model: string;
  year: number;
  license_plate: string;
  current_km: number;
  max_load: number;
  fuel_type: string;
}

interface TruckCreationAttribute extends Optional<TruckAttributes, 'id'> {}

export interface TruckInstance extends Model<TruckAttributes, TruckCreationAttribute>, 
  TruckAttributes {}

const Truck = db.getInstance().define<TruckInstance>('Truck', {
  id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  },
  model: DataTypes.STRING,
  year: DataTypes.INTEGER,
  license_plate: DataTypes.STRING,
  current_km: DataTypes.DOUBLE,
  max_load: DataTypes.DOUBLE,
  fuel_type: DataTypes.STRING
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'trucks',
});

Truck.hasMany(Location, {
  foreignKey: 'truck_id',
  onDelete: 'CASCADE',
});

Location.belongsTo(Truck, {
  foreignKey: 'truck_id'
});

export default Truck;
