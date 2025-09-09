import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/env.mjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, pin } = await req.json();

    // 1) Fast-path: PIN-based login for development
    if (pin) {
      if (!env.ADMIN_PIN) {
        return NextResponse.json(
          { error: "ADMIN_PIN not configured on server" },
          { status: 500 }
        );
      }

      if (pin !== env.ADMIN_PIN) {
        return NextResponse.json(
          { error: "Invalid PIN" },
          { status: 401 }
        );
      }

      const response = NextResponse.json({ message: "PIN authentication successful" });
      response.cookies.set("user-session", "dev-pin-session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    // 2) Default: Email/password via Supabase
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (data.user) {
      // Set session cookie
      const response = NextResponse.json({ 
        user: data.user,
        message: "Authentication successful" 
      });
      
      // Set secure cookie with user session
      response.cookies.set("user-session", data.session?.access_token || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ message: "Signed out successfully" });
    
    // Clear session cookie
    response.cookies.set("user-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


