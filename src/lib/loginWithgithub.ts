import supabase from "./supabase";

export const useGithubLogin = () => {
  const loginWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("GitHub login error:", error.message);
    }

    return { data, error };
  };

  return { loginWithGithub };
};
