import sequelize, {
  DataTypes,
  Model,
  Optional
} from "sequelize";
import db from "../db";

export interface LocationAttributes {
  id?: string;
  latitude: number;
  longitude: number;
  location_datetime: Date
}

interface LocationCreationAttribute extends Optional<LocationAttributes, 'id'> {}

export interface LocationInstance extends Model<LocationAttributes, LocationCreationAttribute> {}

const Location = db.getInstance().define<LocationInstance>('Location', {
  id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  },
  latitude: DataTypes.DOUBLE,
  longitude: DataTypes.DOUBLE,
  location_datetime: DataTypes.DATE,
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'locations',
});

export default Location;
