import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvatarDocument = HydratedDocument<Avatar>;

@Schema()
export class Avatar {
  @Prop({ required: true })
  id: number;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  first_name: string;

  @Prop({ required: false })
  last_name: string;

  @Prop({ required: false })
  avatar: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
