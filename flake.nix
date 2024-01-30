{
  description = "A modern gtk shell for window managers";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    ags = {
      url = "github:Aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
    ...
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system}.default = pkgs.writeShellScriptBin "crystal" ''
      ${ags.packages.${system}.default}/bin/ags -c ${./.}/config.js $@
    '';

    devShells.${system}.default = pkgs.mkShell {
      packages = builtins.attrValues self.outputs.packages.${system};
    };
  };
}
