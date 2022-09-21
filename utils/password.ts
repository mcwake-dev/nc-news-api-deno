import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";

export const hash = async (plaintext: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plaintext, salt);

  return hash;
};
