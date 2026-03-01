def build_profile_text(user):
    prefs = user.preferences or {}

    interests = ", ".join(user.interests or [])
    looking_for = ", ".join(prefs.get("lookingFor", []))

    profile_text = f"""
    {user.name} is {user.age} years old living in {prefs.get('city')}.
    They prefer a {user.sleep_type} lifestyle.
    Their budget is {user.budget}.
    They enjoy {interests}.
    Their personality type is {prefs.get('personality')}.
    They are looking for {looking_for}.
    Occupation: {prefs.get('occupation')}.
    About them: {prefs.get('aboutMe')}.
    """

    return profile_text.strip()