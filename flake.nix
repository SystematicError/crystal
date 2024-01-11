{
  description = "A modern gtk shell for window managers";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    ags = {
      url = "github:Aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {ags, ...}: let
    system = "x86_64-linux";
  in {
    # Kinda pointless right now, will wrap config into ags in the future
    packages.${system}.default = ags.packages.${system}.default;
  };
}
