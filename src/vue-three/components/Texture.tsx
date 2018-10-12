import { Component, Mixins, Prop } from "vue-property-decorator";

import { AssetTypes, TextureFactory, TextureType } from "../types";
import { ThreeAssetComponent, ThreeComponent } from "./base";

@Component
export class Texture extends Mixins(ThreeComponent, ThreeAssetComponent) {
  @Prop({ required: true, type: String })
  private name!: string;

  @Prop({ required: true, type: Function })
  private factory!: TextureFactory;

  public mounted() {
    console.log("mounted texture", this.name);
    this.asset = this.factory();
    this.app().assets.add(this.name, AssetTypes.TEXTURE, this.asset);
  }

  public async beforeDestroy() {
    console.log("beforeDestroy texture", this.name);
    this.app().assets.remove(this.name, AssetTypes.TEXTURE);
  }

  public render(h: any) {
    return <div className="texture">Texture {this.name}</div>;
  }
}
