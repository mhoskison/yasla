<?php namespace App\UserSettings;

use App\Lists\Events\ProductCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Created by matth on 29/01/18 at 16:36
 */
class UserSettingsModel extends Model
{
    protected $table    = "tblUserSettings";
    protected $fillable = ["user_id", "name", "value"];

    public function profile()
    {
        $user_id  = \App\Util::user_id();
        $settings = static::get_all();
        $user     = \App\User::find($user_id);
        return [
            "user_id"       => $user->id,
            "user_name"     => $user->name,
            "user_email"    => $user->email,
            "user_settings" => $settings
        ];
    }

    /**
     * @param array $setting_name
     * @param array $setting_value
     *
     * @return bool|void
     */
    public function update_settings($setting_name, $setting_value)
    {
        $this->user_id = \App\Util::user_id();
        $this->name    = $setting_name;
        $this->value   = $setting_value;

        $match = ["user_id" => $this->user_id, "name" => $setting_name];
        $this->updateOrCreate($match, ["name" => $setting_name, "value" => $setting_value]);
    }

    public function get($setting_name, $default = NULL)
    {
        $user_id = \App\Util::user_id();
        $sql     = "SELECT value FROM tblUserSettings WHERE user_id=? AND name=?";
        $rst     = \DB::select($sql, [$user_id, $setting_name]);
        if (count($rst) === 0) return $default;
        return $rst[0]->value;
    }

    public function get_all()
    {
        $user_id = \App\Util::user_id();
        $sql     = "SELECT name,value FROM tblUserSettings WHERE user_id=?";
        $rst     = \DB::select($sql, [$user_id]);

        $ret = [];
        foreach ($rst as $row) {
            $ret[$row->name] = $row->value;
        }
        return $ret;
    }
}